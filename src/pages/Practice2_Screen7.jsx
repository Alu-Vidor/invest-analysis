import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import CourseHeader from '../components/CourseHeader'
import DatasetCard from '../components/DatasetCard'
import TaskBlock from '../components/TaskBlock'
import AlertBox from '../components/AlertBox'
import ContextNote from '../components/ContextNote'
import MathText from '../components/MathText'

const contextNotes = [
  {
    title: 'Специфика Колмогорова-Смирнова',
    text: "Функция `stats.kstest(data, 'norm')` по умолчанию сравнивает ваши данные со стандартным нормальным распределением. Если доходы имеют другое среднее и СКО, тест нужно запускать либо на стандартизированных данных, либо с явно переданными параметрами `args=(mean, std)`.",
  },
  {
    title: 'Как работает Жарке-Бера?',
    text: 'Критерий Jarque-Bera не сравнивает распределения по точкам. Он проверяет, насколько асимметрия и эксцесс ваших данных близки к нормальным значениям: 0 и 3. Сильное отклонение по этим двум характеристикам ведет к отклонению $H_0$.',
  },
]

const datasetCode = `from sklearn.datasets import fetch_california_housing
import pandas as pd

data = fetch_california_housing()
df = pd.DataFrame(data.data, columns=data.feature_names)
income_data = df['MedInc']  # Непрерывный признак`

const taskItems = [
  {
    title: 'Визуальная оценка (QQ-plot)',
    content: 'Постройте QQ-plot для признака `income_data`. На его основе сформулируйте предварительную гипотезу о форме распределения.',
  },
  {
    title: 'Проверка на нормальность',
    content: [
      'Сформулируйте $H_0$ и $H_1$ для гипотезы о нормальном распределении.',
      'Проверьте $H_0$ на уровне значимости $\\alpha = 0.05$.',
      'Используйте `scipy.stats.kstest`, `scipy.stats.jarque_bera` и `scipy.stats.cramervonmises`.',
    ],
  },
  {
    title: 'Проверка на логнормальность',
    content: [
      'Постройте логарифмированные данные: `np.log(income_data)`.',
      'Сформулируйте гипотезу о логнормальности исходного признака.',
      'Проверьте ту же идею на логарифмированных данных теми же критериями.',
      'Сравните выводы и решите, какая модель описывает доходы лучше.',
    ],
  },
  {
    title: 'Доверительные интервалы',
    content: 'В предположении нормальности логарифмированных данных постройте 95% доверительные интервалы для истинного математического ожидания и генерального СКО.',
  },
]

const documentationLinks = [
  {
    label: 'scikit-learn: fetch_california_housing',
    href: 'https://scikit-learn.org/stable/modules/generated/sklearn.datasets.fetch_california_housing.html',
  },
  {
    label: 'SciPy: kstest',
    href: 'https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.kstest.html',
  },
  {
    label: 'SciPy: jarque_bera',
    href: 'https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.jarque_bera.html',
  },
  {
    label: 'SciPy: cramervonmises',
    href: 'https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.cramervonmises.html',
  },
]

function Practice2_Screen7({ setContextNotes }) {
  useEffect(() => {
    setContextNotes(contextNotes)
  }, [setContextNotes])

  return (
    <article className="space-y-6">
      <CourseHeader
        badge="Практика 2 -> ЛАБОРАТОРНАЯ РАБОТА"
        title="Лаб 2.1. Суд над непрерывными данными"
        subtitle="Проверяем гипотезы о нормальности и логнормальности доходов."
      />

      <section className="content-block space-y-6">
        <MathText
          as="p"
          text={String.raw`В Практике 1 (Лаб 1.1) мы смотрели на распределение доходов населения (\`MedInc\`) визуально с помощью гистограмм. Теперь пришло время строгой математики. Нужно сформулировать гипотезы о форме распределения и проверить их с помощью статистических критериев согласия на уровне значимости $\alpha = 0.05$.`}
          className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
        />

        <DatasetCard
          title="📊 Возвращаемся к доходам (Калифорния)"
          text="Мы продолжаем работу с тем же датасетом из библиотеки `sklearn`. Напоминаем код загрузки:"
          code={datasetCode}
          codeTitle="Python: загрузка и выделение признака `MedInc`"
        />

        <TaskBlock title="Что необходимо сделать в Jupyter Notebook:" items={taskItems} />

        <AlertBox title="Осторожно с Хи-квадрат для непрерывных данных!">
          <MathText
            as="p"
            text={String.raw`В классической литературе критерий Пирсона ($\chi^2$) часто применяют к непрерывным данным. Но для этого их сначала нужно искусственно разбить на интервалы, как в Лаб 1.1. В современной практике для непрерывных величин обычно предпочтительнее тесты Колмогорова, Жарке-Бера и Крамера-Мизеса, потому что они не теряют информацию при группировке.`}
          />
        </AlertBox>

        <ContextNote
          title="Финальный ориентир"
          text="Хороший отчет по лабораторной должен содержать не только `p-value`, но и логику сравнения двух гипотез: нормальность исходных доходов против логнормальности после логарифмирования."
        />

        <section className="rounded-[1.5rem] border border-slate-200 bg-slate-50/80 p-6 dark:border-slate-700 dark:bg-slate-900/70">
          <h3 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
            Официальная документация Python
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
            Здесь собраны первоисточники для загрузки датасета и трех критериев согласия из задания.
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
          to="/practice/2/screen/6"
          className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          Назад
        </Link>

        <Link
          to="/practice/2/screen/8"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Далее: 8. Лаб 2.2. Распределение дискретного признака
          <ArrowRight size={16} />
        </Link>
      </nav>
    </article>
  )
}

export default Practice2_Screen7
