import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import CourseHeader from '../components/CourseHeader'
import CodeBlock from '../components/CodeBlock'
import KeyIdea from '../components/KeyIdea'
import TerminalOutput from '../components/TerminalOutput'

const contextNotes = [
  {
    title: 'Что такое Pandas?',
    text: 'Название произошло от "Panel Data" (панельные данные). Если сильно упростить, Pandas - это Excel на максималках, управляемый кодом. Он позволяет фильтровать, группировать и анализировать данные в сотни раз быстрее, чем это можно сделать мышкой.',
  },
  {
    title: 'pd.Series vs pd.DataFrame',
    text: 'Series - это одномерный массив (одна колонка). DataFrame - это двумерная таблица (строки и колонки). В наших лабах мы будем работать в основном с DataFrame, где колонками выступают разные признаки (например, рост, вес, возраст).',
  },
  {
    title: 'Что проверять первым делом?',
    text: 'После загрузки данных не спешите считать красивые метрики. Сначала посмотрите размер таблицы, типы колонок, минимум, максимум и несколько первых строк. Эти 15 секунд часто спасают от часов неверного анализа.',
  },
]

const createSeriesCode = `import pandas as pd

# Наши оценки 10 студентов (включая один баг)
scores = [65, 70, 72, 75, 78, 80, 82, 85, 88, 1000]

# Создаем объект Series
df_scores = pd.Series(scores)
print(df_scores.values)`

const metricsCode = `mean_score = df_scores.mean()
median_score = df_scores.median()

print(f"Среднее арифметическое: {mean_score}")
print(f"Медиана: {median_score}")`

const describeCode = `print(df_scores.describe())`

const dataframeCode = `df = pd.DataFrame({
    "student_id": range(1, 11),
    "score": scores,
})

print(df.head())`

const outlierCode = `print(df.sort_values("score", ascending=False).head(3))
print()
print(df[df["score"] > 100])`

const importFilesCode = `import pandas as pd

# CSV-файл
students_csv = pd.read_csv("students.csv")
print(students_csv.head())

print()

# Excel-файл
students_xlsx = pd.read_excel("students.xlsx")
print(students_xlsx.head())`

const fileCheckCode = `print(students_csv.shape)
print(students_csv.columns.tolist())
print(students_csv.dtypes)`

const documentationLinks = [
  {
    label: 'pandas: Series',
    href: 'https://pandas.pydata.org/docs/reference/api/pandas.Series.html',
  },
  {
    label: 'pandas: DataFrame',
    href: 'https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.html',
  },
  {
    label: 'pandas: read_csv',
    href: 'https://pandas.pydata.org/docs/reference/api/pandas.read_csv.html',
  },
  {
    label: 'pandas: read_excel',
    href: 'https://pandas.pydata.org/docs/reference/api/pandas.read_excel.html',
  },
]

function Practice1_Screen5({ setContextNotes }) {
  useEffect(() => {
    const timerId = window.setTimeout(() => {
      setContextNotes(contextNotes)
    }, 0)

    return () => {
      window.clearTimeout(timerId)
    }
  }, [setContextNotes])

  return (
    <article className="space-y-6">
      <CourseHeader
        badge="Практика 1 -> ДАННЫЕ В КОДЕ"
        title="Данные в коде: знакомство с Pandas"
        subtitle="Считаем базовые метрики в две строчки кода."
      />

      <section className="content-block space-y-6">
        <p className="text-base leading-relaxed text-slate-700 dark:text-slate-200">
          Ручной счет хорош для понимания интуиции, но в реальности датасеты содержат миллионы
          строк. Индустриальный стандарт для работы с табличными данными в Python - это библиотека
          <code className="mx-1 rounded bg-slate-200 px-1.5 py-0.5 text-sm dark:bg-slate-700">pandas</code>.
          Давайте воспроизведем наш пример с 10 студентами в коде.
        </p>

        <div className="space-y-3">
          <h3 className="section-title">Создание DataFrame</h3>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            Сначала импортируем библиотеку и создадим структуру данных
            <code className="mx-1 rounded bg-slate-200 px-1.5 py-0.5 text-sm dark:bg-slate-700">Series</code>
            (одномерный массив, по сути - одна колонка в таблице).
          </p>
          <CodeBlock code={createSeriesCode} language="python" title="Python" />
          <TerminalOutput lines="[  65   70   72   75   78   80   82   85   88 1000]" />
        </div>

        <div className="space-y-3">
          <h3 className="section-title">Расчет метрик</h3>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            Теперь нам не нужно писать циклы суммирования. У Pandas есть встроенные методы для
            описательной статистики. Считаем среднее и медиану:
          </p>
          <CodeBlock code={metricsCode} language="python" title="Python" />
          <TerminalOutput lines={['Среднее арифметическое: 169.5', 'Медиана: 79.0']} />
        </div>

        <div className="space-y-3">
          <h3 className="section-title">Быстрая сводка по колонке</h3>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            Одна из самых полезных привычек в Pandas -
            <code className="mx-1 rounded bg-slate-200 px-1.5 py-0.5 text-sm dark:bg-slate-700">describe()</code>.
            Этот метод за секунду показывает количество наблюдений, среднее, стандартное отклонение,
            квантили и экстремальные значения. Именно максимум в 1000 сразу должен заставить вас
            насторожиться.
          </p>
          <CodeBlock code={describeCode} language="python" title="Python" />
          <TerminalOutput
            lines={[
              'count      10.000000',
              'mean      169.500000',
              'std       290.523282',
              'min        65.000000',
              '25%        72.750000',
              '50%        79.000000',
              '75%        84.250000',
              'max      1000.000000',
              'dtype: float64',
            ]}
          />
        </div>

        <div className="space-y-3">
          <h3 className="section-title">Переходим от Series к таблице</h3>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            Для учебного примера достаточно
            <code className="mx-1 rounded bg-slate-200 px-1.5 py-0.5 text-sm dark:bg-slate-700">Series</code>,
            но реальные данные почти всегда живут в
            <code className="mx-1 rounded bg-slate-200 px-1.5 py-0.5 text-sm dark:bg-slate-700">DataFrame</code>.
            Добавим идентификатор студента и получим нормальную табличную структуру, с которой уже
            удобно фильтровать строки и строить графики.
          </p>
          <CodeBlock code={dataframeCode} language="python" title="Python" />
          <TerminalOutput
            lines={[
              '   student_id  score',
              '0           1     65',
              '1           2     70',
              '2           3     72',
              '3           4     75',
              '4           5     78',
            ]}
          />
        </div>

        <div className="space-y-3">
          <h3 className="section-title">Как быстро найти подозрительные строки</h3>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            Хороший аналитик после расчета метрик сразу пытается понять, какая строка испортила
            среднее. Самый простой путь - отсортировать данные по убыванию или применить фильтр.
            Так вы не просто видите аномалию, а находите конкретную запись, которую нужно проверить
            в источнике.
          </p>
          <CodeBlock code={outlierCode} language="python" title="Python" />
          <TerminalOutput
            lines={[
              '   student_id  score',
              '9          10   1000',
              '8           9     88',
              '7           8     85',
              '',
              '   student_id  score',
              '9          10   1000',
            ]}
          />
        </div>

        <div className="space-y-3">
          <h3 className="section-title">Загрузка своих данных: CSV и XLSX</h3>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            На практике данные редко прописывают вручную в коде. Обычно аналитик получает файл от
            коллег, выгрузку из CRM или таблицу из Excel. В Pandas для этого есть готовые функции:
            <code className="mx-1 rounded bg-slate-200 px-1.5 py-0.5 text-sm dark:bg-slate-700">read_csv()</code>
            и
            <code className="mx-1 rounded bg-slate-200 px-1.5 py-0.5 text-sm dark:bg-slate-700">read_excel()</code>.
          </p>
          <CodeBlock code={importFilesCode} language="python" title="Python" />
          <TerminalOutput
            lines={[
              '   student_id  score',
              '0           1     65',
              '1           2     70',
              '2           3     72',
              '3           4     75',
              '4           5     78',
              '',
              '   student_id  score',
              '0           1     65',
              '1           2     70',
              '2           3     72',
              '3           4     75',
              '4           5     78',
            ]}
          />
        </div>

        <div className="space-y-3">
          <h3 className="section-title">Что проверить сразу после загрузки файла</h3>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            Сам факт успешной загрузки еще не означает, что таблица прочиталась правильно. Нужно
            сразу посмотреть размер набора данных, названия колонок и их типы. Это помогает быстро
            заметить типичные проблемы: лишний индекс, неправильный разделитель в CSV, текст вместо
            чисел или пустые значения в критичных столбцах.
          </p>
          <CodeBlock code={fileCheckCode} language="python" title="Python" />
          <TerminalOutput
            lines={[
              '(10, 2)',
              "['student_id', 'score']",
              'student_id    int64',
              'score         int64',
              'dtype: object',
            ]}
          />
        </div>

        <KeyIdea title="Инструмент не заменяет мозг">
          Как видите, Python мгновенно выдал оба результата. Код никогда не скажет вам: "Эй, здесь
          есть выброс, не используй .mean()!". Библиотека просто выполняет математическую
          операцию. Выбор правильной метрики в зависимости от природы данных и наличия аномалий -
          это исключительно ваша задача как аналитика.
        </KeyIdea>

        <KeyIdea title="Мини-чеклист перед анализом">
          Импортировали данные, посмотрели первые строки, вызвали `describe()`, нашли минимум и
          максимум, сравнили среднее с медианой. Это уже маленький, но профессиональный пайплайн
          проверки качества данных. Даже на очень простом датасете он помогает не доверять цифрам
          вслепую.
        </KeyIdea>

        <KeyIdea title="Практический вывод">
          Если данные пришли в `CSV` или `XLSX`, ваша первая задача не в том, чтобы сразу считать
          среднее. Сначала загрузите файл, проверьте структуру таблицы, убедитесь, что числовые
          колонки действительно числовые, и только потом переходите к статистике.
        </KeyIdea>
        <section className="rounded-[1.5rem] border border-slate-200 bg-slate-50/80 p-6 dark:border-slate-700 dark:bg-slate-900/70">
          <h3 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
            Официальная документация Python
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
            Базовые страницы Pandas, которые стоит открыть перед первой лабораторной.
          </p>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {documentationLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-indigo-300 hover:text-indigo-700 dark:border-slate-700 dark:bg-slate-950/70 dark:text-slate-200 dark:hover:border-indigo-700 dark:hover:text-indigo-300"
              >
                {link.label}
              </a>
            ))}
          </div>
        </section>
      </section>

      <nav className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Link
          to="/practice/1/screen/4"
          className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          Назад
        </Link>

        <Link
          to="/practice/1/screen/6"
          className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Далее: 6. Гистограмма и эмпирическая функция
        </Link>
      </nav>
    </article>
  )
}

export default Practice1_Screen5
