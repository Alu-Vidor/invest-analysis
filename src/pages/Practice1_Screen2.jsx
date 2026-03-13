import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Coins, ListOrdered, Ruler, Tags, Thermometer } from 'lucide-react'
import CourseHeader from '../components/CourseHeader'
import IdeaCard from '../components/IdeaCard'

const contextNotes = [
  {
    title: 'Ошибка новичка',
    text: 'Классическая ошибка аналитика - загрузить датасет, увидеть столбец user_id (например, 1045, 1046...) или zip_code (почтовый индекс) и посчитать по нему среднее. То, что данные записаны цифрами, еще не делает их количественной шкалой. ID пользователя - это чистая номинативная шкала.',
  },
  {
    title: 'Шкалы в Pandas',
    text: 'Когда мы перейдем к коду, вы увидите, как шкалы маппятся на типы данных в pandas: Номинативные/Порядковые -> object или category. Интервальные/Отношений -> int64 или float64.',
  },
]

const scaleCards = [
  {
    title: 'Номинативная шкала (Категории)',
    icon: Tags,
    examples: 'Цвет глаз, марка автомобиля, пол, город.',
    essence: 'Данные просто распределены по корзинам. Между ними нет порядка.',
    math: 'Можно только считать количество (частоту) и искать самое популярное значение (моду). Считать средний цвет глаз - бессмысленно.',
    action:
      'Подсчитывать частоты, доли и моду; строить столбчатые диаграммы и таблицы сопряженности.',
    tone: 'border-rose-200 bg-rose-50/70 text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300',
  },
  {
    title: 'Порядковая шкала (Ранги)',
    icon: ListOrdered,
    examples: 'Оценки в отзыве (1-5 звезд), уровень образования, воинское звание.',
    essence:
      'Появляется порядок (больше/меньше), но расстояние между категориями неизвестно.',
    math: 'Можно сортировать и искать медиану. Считать среднее строго математически нельзя (хотя в бизнесе это делают очень часто).',
    action: 'Сравнивать порядок, считать медиану и квантили, использовать ранговые методы.',
    tone: 'border-amber-200 bg-amber-50/70 text-amber-700 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-300',
  },
  {
    title: 'Интервальная шкала',
    icon: Thermometer,
    examples: 'Температура в Цельсиях, год рождения.',
    essence:
      'Есть порядок и точное расстояние между делениями, но нет абсолютного нуля.',
    math: 'Можно складывать и вычитать, считать среднее и дисперсию. Нельзя интерпретировать отношение: 20°C не в два раза теплее 10°C.',
    action: 'Анализировать разницы, применять среднее/дисперсию и линейные преобразования.',
    tone: 'border-cyan-200 bg-cyan-50/70 text-cyan-700 dark:border-cyan-900 dark:bg-cyan-950/40 dark:text-cyan-300',
  },
  {
    title: 'Шкала отношений (Количественная)',
    icon: Coins,
    altIcon: Ruler,
    examples: 'Зарплата, рост, вес, количество кликов на сайте.',
    essence:
      'Самая богатая шкала: есть порядок, равные интервалы и настоящий ноль.',
    math: 'Работают все базовые операции: сложение, умножение, среднее, логарифмы. 100 тысяч рублей действительно в 2 раза больше, чем 50 тысяч.',
    action: 'Применять весь арсенал количественной статистики и машинного обучения.',
    tone: 'border-emerald-200 bg-emerald-50/70 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300',
  },
]

const scaleRules = [
  {
    scale: 'Номинативная',
    ok: 'частоты, доли, мода',
    avoid: 'среднее, дисперсия, корреляция Пирсона',
  },
  {
    scale: 'Порядковая',
    ok: 'медиана, квартили, ранги',
    avoid: 'арифметика как для количественных данных',
  },
  {
    scale: 'Интервальная',
    ok: 'разности, среднее, дисперсия',
    avoid: 'отношения вида “в 2 раза больше”',
  },
  {
    scale: 'Отношений',
    ok: 'весь базовый аппарат количественной статистики',
    avoid: 'механическое игнорирование смысла данных',
  },
]

function Practice1_Screen2({ setContextNotes }) {
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
        badge="Практика 1 -> ВВЕДЕНИЕ"
        title="Шкалы измерений: не складывай яблоки с рангами"
        subtitle="Почему df.mean() иногда выдает математический абсурд."
      />

      <section className="content-block">
        <p className="text-base leading-relaxed text-slate-700 dark:text-slate-200">
          Прежде чем писать код и считать статистику, нужно понять природу наших данных. Данные
          бывают разными, и то, что разрешено делать с одними, категорически запрещено делать с
          другими. Выделяют 4 основных типа (шкалы) измерений.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {scaleCards.map((card) => {
          const Icon = card.icon
          const AltIcon = card.altIcon

          return (
            <article
              key={card.title}
              className={`rounded-2xl border p-5 shadow-soft ${card.tone}`}
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <h3 className="text-lg font-semibold leading-tight">{card.title}</h3>
                <div className="flex items-center gap-2">
                  <Icon size={20} />
                  {AltIcon ? <AltIcon size={20} /> : null}
                </div>
              </div>

              <div className="space-y-3 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
                <p>
                  <span className="font-semibold">Примеры:</span> {card.examples}
                </p>
                <p>
                  <span className="font-semibold">Суть:</span> {card.essence}
                </p>
                <p>
                  <span className="font-semibold">Математика:</span> {card.math}
                </p>
              </div>

              <div className="mt-4 rounded-xl border border-current/20 bg-white/70 p-3 dark:bg-slate-900/30">
                <p className="text-xs font-semibold uppercase tracking-[0.08em]">Что можно делать</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
                  {card.action}
                </p>
              </div>
            </article>
          )
        })}
      </section>

      <IdeaCard title="Золотое правило">
        Тип шкалы диктует выбор статистического метода. Если вы примените метод для
        количественной шкалы (например, корреляцию Пирсона) к номинативным данным, Python честно
        все посчитает и выдаст число, но это число будет статистическим мусором.
      </IdeaCard>

      <section className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-700 dark:bg-slate-900">
        <h3 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
          Шкала - допустимые методы
        </h3>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {scaleRules.map((rule) => (
            <article
              key={rule.scale}
              className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-700 dark:bg-slate-950/70"
            >
              <h4 className="text-sm font-semibold uppercase tracking-[0.08em] text-slate-900 dark:text-white">
                {rule.scale}
              </h4>
              <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
                <span className="font-semibold">Можно:</span> {rule.ok}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
                <span className="font-semibold">Нельзя или опасно:</span> {rule.avoid}
              </p>
            </article>
          ))}
        </div>
      </section>

      <nav className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Link
          to="/practice/1/screen/1"
          className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          Назад
        </Link>

        <Link
          to="/practice/1/screen/3"
          className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Далее: 3. Мини-пример на 10 студентах
        </Link>
      </nav>
    </article>
  )
}

export default Practice1_Screen2
