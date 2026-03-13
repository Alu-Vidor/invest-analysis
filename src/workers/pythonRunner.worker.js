import { loadPyodide, version as pyodideVersion } from 'pyodide'

const PYODIDE_BASE_URL = `https://cdn.jsdelivr.net/pyodide/v${pyodideVersion}/full/`

let pyodidePromise
let loadedPackages = new Set()
let stdoutBuffer = []
let stderrBuffer = []

function resetBuffers() {
  stdoutBuffer = []
  stderrBuffer = []
}

function pushStdout(message) {
  stdoutBuffer.push(message)
}

function pushStderr(message) {
  stderrBuffer.push(message)
}

async function ensurePyodide() {
  if (!pyodidePromise) {
    pyodidePromise = loadPyodide({
      indexURL: PYODIDE_BASE_URL,
      stdout: pushStdout,
      stderr: pushStderr,
    }).then((pyodide) => {
      pyodide.setStdout({ batched: pushStdout })
      pyodide.setStderr({ batched: pushStderr })
      return pyodide
    })
  }

  return pyodidePromise
}

async function ensurePackages(pyodide, packages) {
  const missingPackages = packages.filter((pkg) => !loadedPackages.has(pkg))

  if (missingPackages.length === 0) {
    return
  }

  await pyodide.loadPackage(missingPackages)
  loadedPackages = new Set([...loadedPackages, ...missingPackages])
}

function serializeResult(result) {
  if (result === undefined || result === null) {
    return ''
  }

  const text = typeof result === 'string' ? result : String(result)

  if (typeof result.destroy === 'function') {
    result.destroy()
  }

  return text
}

self.onmessage = async (event) => {
  const { type, requestId, code = '', packages = [] } = event.data

  try {
    if (type === 'init') {
      self.postMessage({
        type: 'status',
        phase: 'initializing',
        message: 'Загружаем Pyodide и подготавливаем среду Python...',
      })

      await ensurePyodide()

      self.postMessage({
        type: 'ready',
      })

      return
    }

    if (type !== 'run') {
      return
    }

    resetBuffers()

    self.postMessage({
      type: 'status',
      requestId,
      phase: 'initializing',
      message: 'Подключаем интерпретатор Python...',
    })

    const pyodide = await ensurePyodide()

    if (packages.length > 0) {
      self.postMessage({
        type: 'status',
        requestId,
        phase: 'packages',
        message: 'Загружаем необходимые пакеты Python...',
      })

      await ensurePackages(pyodide, packages)
    }

    self.postMessage({
      type: 'status',
      requestId,
      phase: 'running',
      message: 'Выполняем код...',
    })

    const result = await pyodide.runPythonAsync(code)

    self.postMessage({
      type: 'result',
      requestId,
      stdout: stdoutBuffer.join('\n').trim(),
      stderr: stderrBuffer.join('\n').trim(),
      result: serializeResult(result),
    })
  } catch (error) {
    self.postMessage({
      type: 'error',
      requestId,
      error: error instanceof Error ? error.message : 'Не удалось выполнить Python-код.',
      stdout: stdoutBuffer.join('\n').trim(),
      stderr: stderrBuffer.join('\n').trim(),
    })
  }
}
