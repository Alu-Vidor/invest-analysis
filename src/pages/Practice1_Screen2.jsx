import { nikkeiVolatilityAug2024 } from '../data/practice1RealData'

const contextNotes = [
  {
    title: 'Четыре базовые категории',
    text: 'Доходность показывает размер результата, риск — степень неопределенности, ликвидность — скорость выхода из позиции, горизонт — допустимую длину вложения.',
  },
  {
    title: 'Рекордная волатильность',
    text: 'Пример Nikkei 225 в августе 2024 года показывает, как риск может реализоваться мгновенно, проверяя ликвидность рынка на прочность.',
  },
]

const categoryCards = [
  {
    title: 'Доходность',
    text: 'Относительное изменение стоимости вложения за выбранный период. Она отвечает на вопрос, насколько эффективно использован капитал.',
  },
  {
    title: 'Риск',
    text: 'Изменчивость возможных результатов относительно ожидаемого значения. Чем выше разброс, тем менее предсказуем итог.',
  },
  {
    title: 'Ликвидность',
    text: 'Способность быстро превратить актив в деньги без существенной потери стоимости. В моменты паники ликвидность может резко снижаться.',
  },
  {
    title: 'Горизонт',
    text: 'Период, на который инвестор готов вложить средства. Оценка инструмента на дневном и десятилетнем горизонтах различается.',
  },
]

const nikkeiCode = `import pandas as pd

nikkei = pd.DataFrame(
    {
        "date": ["2024-08-01", "2024-08-02", "2024-08-05", "2024-08-06", "2024-08-07", "2024-08-08", "2024-08-09"],
        "close": [38126.33, 35909.70, 31458.42, 34675.46, 35089.62, 34831.22, 35025.00],
        "volume_billion": [1.8, 2.5, 3.2, 3.8, 2.8, 2.1, 1.9],
    }
)

# Падение "Черного понедельника"
drop_5_aug = nikkei.iloc[2]["close"] / nikkei.iloc[1]["close"] - 1
# Рекордный отскок
rebound_6_aug = nikkei.iloc[3]["close"] / nikkei.iloc[2]["close"] - 1

price_range = (nikkei["close"].min(), nikkei["close"].max())
avg_volume = nikkei["volume_billion"].mean()

print(f"Падение 5 авг: {round(drop_5_aug * 100, 2)}%")
print(f"Отскок 6 авг: {round(rebound_6_aug * 100, 2)}%")
print("Диапазон индекса:", price_range)
print("Средний объем (млрд):", round(avg_volume, 2))`


const summaryCode = `summary_frame = (
    nikkei.assign(daily_change=nikkei["close"].pct_change())
        [["close", "volume_billion", "daily_change"]]
        .agg(["mean", "min", "max"])
)

print(summary_frame.round(3))
print()
print("Три дня с самым низким закрытием:")
print(nikkei.nsmallest(3, "close")[["date", "close"]])`

const summaryPlaygroundCode = `import pandas as pd

nikkei = pd.DataFrame(
    {
        "date": ["2024-08-01", "2024-08-02", "2024-08-05", "2024-08-06", "2024-08-07", "2024-08-08", "2024-08-09"],
        "close": [38126.33, 35909.70, 31458.42, 34675.46, 35089.62, 34831.22, 35025.00],
        "volume_billion": [1.8, 2.5, 3.2, 3.8, 2.8, 2.1, 1.9],
    }
)

summary_frame = (
    nikkei.assign(daily_change=nikkei["close"].pct_change())
        [["close", "volume_billion", "daily_change"]]
        .agg(["mean", "min", "max"])
)

print(summary_frame.round(3))
print()
print("Три дня с самым низким закрытием:")
print(nikkei.nsmallest(3, "close")[["date", "close"]])`

function Practice1_Screen2({ setContextNotes }) {
  useEffect(() => {
    setContextNotes(contextNotes)
  }, [setContextNotes])

  return (
    <article className="space-y-6">
      <CourseHeader
        badge="Практика 1 · Основы инвестиционного анализа"
        title="Базовые категории: доходность, риск, ликвидность, горизонт"
        subtitle="Вводим четыре базовых понятия на примере шоковой волатильности японского рынка в августе 2024 года."
      />

      <section className="content-block space-y-4">
        <p className="text-base leading-relaxed text-slate-700 dark:text-slate-200">
          Представьте, что вы инвестировали в японские акции. В начале августа 2024 года рынок 
          столкнулся с рекордным потрясением. Если смотреть только на итоговую годовую прибыль, 
          эти дни могут показаться просто «шумом». Но для инветора внутри этого момента 
          на первый план выходят риск и ликвидность.
        </p>
        <p className="text-base leading-relaxed text-slate-700 dark:text-slate-200">
          Мы вводим <strong>доходность</strong> (англ. <em>return</em>),{' '}
          <strong>риск</strong> (англ. <em>risk</em>), <strong>ликвидность</strong> (англ.{' '}
          <em>liquidity</em>) и <strong>инвестиционный горизонт</strong> (англ.{' '}
          <em>investment horizon</em>). Инвестиционная альтернатива почти никогда не описывается
          одним показателем. Одинаковая доходность при разном риске — это разные решения.
        </p>
        <MathText
          as="p"
          text="Инвестиционный анализ уже на базовом уровне имеет многокритериальную природу. В моменты рыночной паники риск перестает быть абстрактной цифрой и становится вопросом возможности выйти из актива (ликвидности)."
          className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
        />
      </section>

      <section className="grid items-start gap-4 md:grid-cols-2">
        <article className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-700 dark:bg-slate-900">
          <h3 className="text-base font-semibold text-slate-900 dark:text-white">Проблема одномерного взгляда</h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
            Два актива могут дать +10% за год, но один плавно рос, а другой упал на 30% и затем отскочил. 
            Для инвестора риск во втором случае был кратно выше.
          </p>
        </article>

        <article className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-700 dark:bg-slate-900">
          <h3 className="text-base font-semibold text-slate-900 dark:text-white">Почему категории работают вместе</h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
            Доходность отвечает за результат, риск — за неопределенность, ликвидность — за условия
            выхода, а горизонт — за временную рамку решения. В кризис эти связи обнажаются.
          </p>
        </article>
      </section>

      <section className="grid items-start gap-4 md:grid-cols-2">
        {categoryCards.map((card) => (
          <article
            key={card.title}
            className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-700 dark:bg-slate-900"
          >
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">{card.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
              {card.text}
            </p>
          </article>
        ))}
      </section>

      <section className="grid items-start gap-4 lg:grid-cols-2">
        <section className="content-block">
          <h3 className="section-title">Математическая запись</h3>
          <MathText
            as="p"
            text="Доходность удобно задавать как относительное изменение стоимости. Риск можно понимать как разброс возможных значений (волатильность) вокруг ожидаемого результата."
            className="mt-3 text-base leading-relaxed text-slate-700 dark:text-slate-200"
          />
          <MathBlock formula={String.raw`R = \frac{V_1 - V_0}{V_0}`} />
          <MathBlock formula={String.raw`\sigma^2 = \sum_{i=1}^{m} p_i \left(r_i - \mathbb{E}[R]\right)^2`} />
          <p className="mt-3 text-base leading-relaxed text-slate-700 dark:text-slate-200">
            Здесь <strong>V₀</strong> — начальная стоимость, <strong>V₁</strong> —
            конечная стоимость, <strong>rᵢ</strong> — возможная доходность, <strong>pᵢ</strong> — вероятность. 
            В кризис вероятности экстремальных исходов резко возрастают.
          </p>
        </section>

        <IdeaCard title="Как связаны категории">
          <p>
            В августе 2024 года в Японии мы увидели «идеальный шторм»: падение цены (отрицательная доходность), 
            всплеск волатильности (риск) и гигантские объемы торгов (ликвидность), когда все пытались выйти одновременно.
          </p>
        </IdeaCard>
      </section>

      <section className="content-block">
        <h3 className="section-title">Реальный пример: Nikkei 225 в августе 2024</h3>
        <MathText
          as="p"
          text="Ниже приведен фрагмент ценового шока индекса Nikkei 225. 5 августа индекс упал на рекордные 12.4%, а на следующий день показал исторический отскок. Это лучший пример для осознания того, что такое рыночный риск."
          className="mt-3 text-base leading-relaxed text-slate-700 dark:text-slate-200"
        />
      </section>

      <SourceNote>
        Данные: индекс <strong>Nikkei 225 (Япония)</strong>, цены закрытия за первые дни августа 2024 года. 
        Пример иллюстрирует экстремальную волатильность и всплеск ликвидности.
      </SourceNote>

      <ComparisonTable
        columns={nikkeiVolatilityAug2024.map((row) => row.date)}
        rows={[
          {
            label: 'Закрытие, JPY',
            values: nikkeiVolatilityAug2024.map((row) => row.close.toFixed(0)),
            highlight: true,
          },
          {
            label: 'Объем (млрд акций)',
            values: nikkeiVolatilityAug2024.map((row) => row.volume.toExponential(1)),
          },
        ]}
      />

      <section className="space-y-4">
        <ThinkQuestion question="Если рынок упал на 12% и на следующий день вырос на 10%, вернулся ли инвестор в исходную точку?">
          <p>
            Нет. Это математическая ловушка процентов. Если актив ценой 100 упадет на 12%, он станет стоить 88. 
            Рост на 10% от 88 даст 96.8.
          </p>
          <p>
            Для восстановления после падения на 12.4% (как 5 августа) нужен рост на 14.2%. 
            Этот пример показывает, почему асимметрия риска так важна в анализе.
          </p>
        </ThinkQuestion>

        <IdeaCard title="Ликвидность в моменты паники">
          <p>
            Объем торгов 6 августа в Японии был рекордным. Это означает, что рынок «переварил» панику, 
            но цена выхода для тех, кто продавал в разгар падения, была крайне невыгодной. 
            Ликвидность — это не просто возможность продать, а возможность продать по цене, близкой к рыночной.
          </p>
        </IdeaCard>

        <section className="content-block">
          <h3 className="section-title">Python: анализируем шоковую волатильность</h3>
          <div className="mt-4">
            <ExecutablePythonBlock
              code={nikkeiCode}
              title="Python: считаем падение и отскок"
              packages={['pandas']}
              note="Запустите код, чтобы увидеть масштаб изменений в процентах."
            />
          </div>
        </section>
      </section>

      <HandbookDetails title="Подробнее: волатильность и эффект «толстых хвостов»">
        <p>
          В теории часто предполагают, что доходности распределены нормально. Но события августа 2024 в Японии 
          напоминают нам о «черных лебедях» — событиях, вероятность которых математически мала, но 
          которые случаются чаще, чем предсказывает простая модель.
        </p>
        <p>
          Инвестиционный аналитик при оценке риска обязан учитывать такие экстремальные сценарии, 
          особенно при выборе горизонта вложения.
        </p>
      </HandbookDetails>

      <section className="space-y-4">
        <section className="content-block">
          <h3 className="section-title">Python: сводные метрики кризиса</h3>
          <div className="mt-4">
            <ExecutablePythonBlock
              code={summaryCode}
              title="Python: агрегация данных шокового периода"
              playgroundCode={summaryPlaygroundCode}
              packages={['pandas']}
            />
          </div>
        </section>

        <IdeaCard title="Зачем эти расчеты">
          <p>
            Они помогают быстро оценить масштаб бедствия: какова была средняя цена за неделю кризиса 
            и насколько сильно дневное изменение отклонялось от нормы.
          </p>
        </IdeaCard>
      </section>

      <KeyIdea title="Ключевой вывод">
        Доходность, риск, ликвидность и горизонт — это не просто термины из учебника. В кризисные моменты, 
        подобные японскому «черному понедельнику» 2024 года, они становятся вопросом выживания капитала инвестора.
      </KeyIdea>

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
          Далее: 3. Цифровая экономика
        </Link>
      </nav>
    </article>
  )
}

export default Practice1_Screen2
