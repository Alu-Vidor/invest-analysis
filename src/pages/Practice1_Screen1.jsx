import { ofz26238, ofz26238Schedule } from '../data/practice1RealData'

const paragraphClass = 'text-base leading-relaxed text-slate-700 dark:text-slate-200'

const contextNotes = [
  {
    title: 'Инвестиционное решение',
    text: 'Это выбор о размещении капитала сегодня ради ожидаемого результата в будущем. Мы формализуем решение через сумму вложения, календарь поступлений и ограничения по времени.',
  },
  {
    title: 'Денежный поток',
    text: 'Денежный поток — это упорядоченная во времени последовательность выплат и поступлений. Именно в такой форме инвестиционное решение становится объектом расчета.',
  },
]

const definitionCards = [
  {
    title: 'Инвестиционное решение',
    text: 'Выбор между альтернативами размещения капитала, где нас интересуют не только ожидаемые деньги, но и сроки их получения.',
  },
  {
    title: 'Первоначальные инвестиции',
    text: 'Стартовое выбытие капитала. В формулах его часто обозначают как I₀ и записывают с отрицательным знаком.',
  },
  {
    title: 'Денежный поток',
    text: 'Поступление или выплата в конкретный период t. В инвестиционном анализе его обозначают как CF_t.',
  },
  {
    title: 'Инвестиционный горизонт',
    text: 'Длина периода, на котором мы оцениваем решение и готовы ждать экономический результат.',
  },
]

const cashFlowCode = `import pandas as pd

face_value = 1000
coupon_rate = 0.071
coupon = face_value * coupon_rate / 2

cash_flow = pd.DataFrame(
    {
        "period": list(range(1, 9)),
        "date": [
            "2024-06-05", "2024-12-04",
            "2025-06-04", "2025-12-03",
            "2026-06-03", "2026-12-02",
            "2027-06-02", "2027-12-01",
        ],
        "coupon_rub": [coupon] * 8,
        "principal_rub": [0, 0, 0, 0, 0, 0, 0, face_value],
    }
)

cash_flow["cash_flow_rub"] = cash_flow["coupon_rub"] + cash_flow["principal_rub"]
cash_flow["cumulative_inflow_rub"] = cash_flow["cash_flow_rub"].cumsum()

print(cash_flow.round(2))
print()
print("Total inflow:", round(cash_flow["cash_flow_rub"].sum(), 2))`

function CashFlowChart() {
  const maxAbs = Math.max(...ofz26238Schedule.map((item) => Math.abs(item.cashFlowRub)))
  const zeroY = 120

  return (
    <svg
      viewBox="0 0 620 240"
      className="h-full w-full"
      role="img"
      aria-label="Структура денежных потоков ОФЗ 26238"
    >
      <line x1="40" y1={zeroY} x2="585" y2={zeroY} stroke="#64748b" strokeWidth="2" />
      {ofz26238Schedule.map((item, index) => {
        const x = 58 + index * 66
        const barHeight = (Math.abs(item.cashFlowRub) / maxAbs) * 90
        const y = zeroY - barHeight

        return (
          <g key={item.period}>
            <rect x={x} y={y} width="38" height={barHeight} rx="10" fill="#2563eb" opacity="0.9" />
            <text x={x + 19} y="205" textAnchor="middle" fontSize="11" fill="#334155">
              k={item.period}
            </text>
            {index === ofz26238Schedule.length - 1 ? (
              <text x={x + 19} y={y - 8} textAnchor="middle" fontSize="11" fill="#0f172a">
                1035.4
              </text>
            ) : (
              <text x={x + 19} y={y - 8} textAnchor="middle" fontSize="10" fill="#475569">
                35.4
              </text>
            )}
          </g>
        )
      })}
      <text x="10" y="34" fontSize="12" fill="#475569">
        RUB
      </text>
    </svg>
  )
}

function Practice1_Screen1({ setContextNotes }) {
  useEffect(() => {
    setContextNotes(contextNotes)
  }, [setContextNotes])

  return (
    <article className="space-y-6">
      <CourseHeader
        badge="Практика 1 · Основы инвестиционного анализа"
        title="Инвестиционное решение как объект математического анализа"
        subtitle="Начинаем с живой профессиональной ситуации: инвестор выбирает, покупать ли гособлигацию РФ (ОФЗ), и переводит описание инструмента в язык потоков и переменных."
      />

      <section className="content-block space-y-4">
        <p className={paragraphClass}>
          Представьте, что вы выбираете, куда разместить свободный капитал: оставить деньги на
          счете, купить облигацию или дождаться другой возможности. В такой ситуации нас
          интересует не абстрактная «хорошесть» идеи, а <strong>инвестиционное решение</strong>{' '}
          (англ. <em>investment decision</em>) как объект, который можно описать числами.
        </p>
        <p className={paragraphClass}>
          Первое, что мы делаем, — выделяем <strong>денежный поток</strong> (англ.{' '}
          <em>cash flow</em>): когда и сколько денег инвестор платит, а когда и сколько получает
          обратно. Пока этого разложения нет, невозможно ни сравнивать альтернативы, ни проверять
          их в Python.
        </p>
        <MathBlock formula={String.raw`D = f\left(I_0,\; CF_1,\ldots,CF_n,\; r,\; \sigma,\; L,\; T\right)`} />
        <p className={paragraphClass}>
          В этой записи <strong>I₀</strong> — первоначальные вложения, <strong>CFₜ</strong> —
          денежный поток в период <strong>t</strong>, <strong>r</strong> — требуемая доходность
          или цена капитала (ставка дисконтирования), <strong>σ</strong> — мера риска, <strong>L</strong> — ликвидность,
          <strong>T</strong> — горизонт анализа. Формула пока не решает задачу за нас, но задает
          полный состав входных данных.
        </p>
        <p className={paragraphClass}>
          Когда нам важно видеть не отдельный платеж, а накопленный результат к моменту{' '}
          <strong>t</strong>, мы складываем все потоки с начала наблюдения:
        </p>
        <MathBlock formula={String.raw`C_t = \sum_{k=0}^{t} CF_k`} />
      </section>

      <section className="grid items-start gap-4 lg:grid-cols-2">
        <IdeaCard title="Зачем нужна формализация">
          <p>
            Как только экономическая история переведена в переменные и периоды, у нас появляется
            единый язык для сравнения облигации, кредита, проекта и рыночного актива.
          </p>
        </IdeaCard>

        <IdeaCard title="Что мы считаем хорошим решением">
          <p>
            На старте курса мы не выбираем один идеальный критерий, а учимся видеть структуру:
            сколько денег уходит сегодня (цена актива), когда они возвращаются и насколько предсказуем этот
            календарь.
          </p>
        </IdeaCard>
      </section>

      <section className="grid items-start gap-4 lg:grid-cols-2">
        <IdeaCard title="Альтернативная стоимость капитала">
          <p>
            Любое вложение сравнивается не с пустотой, а с лучшей доступной альтернативой.
            Поэтому государственная облигация — это часто «безрисковый» бенчмарк для всех прочих идей.
          </p>
        </IdeaCard>

        <IdeaCard title="Прибыль и денежный поток — не одно и то же">
          <p>
            Бухгалтерская прибыль может быть положительной, а денег в распоряжении инвестора пока
            не появилось. Для инвестиционного анализа это принципиально: решение принимается по
            потокам денег.
          </p>
        </IdeaCard>
      </section>

      <section className="grid items-start gap-4 md:grid-cols-2">
        {definitionCards.map((card) => (
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

      <RecapBlock title="Реальный кейс: длинная гособлигация РФ как объект анализа">
        <p>
          Для примера возьмем реальный инструмент: <strong>{ofz26238.title}</strong> ({ofz26238.securityId}).
          Это классический пример того, как цена входа и календарь выплат определяют доходность.
        </p>
        <p>
          Мы видим типичную структуру: сначала капитал инвестируется (покупка по рыночной цене, которая сейчас значительно ниже номинала), 
          затем возникают регулярные купоны, а в финале возвращается полный номинал. Именно
          такую последовательность мы и переведем в код.
        </p>
      </RecapBlock>

      <SourceNote>
        Данные примера: <strong>ОФЗ 26238 (купон 7.1%)</strong>. Рыночная цена на март 2026 ~61.1% от номинала.
        Номинал {ofz26238.faceValueRub} RUB, полугодовой купон 35.40 RUB. 
        Доходность к погашению (YTM) составляет ~{ofz26238.yieldToMaturityPct}%.
      </SourceNote>

      <ComparisonTable
        columns={ofz26238Schedule.map((row) => `k=${row.period}`)}
        rows={[
          {
            label: 'Дата платежа',
            values: ofz26238Schedule.map((row) => row.date),
          },
          {
            label: 'Купон, RUB',
            values: ofz26238Schedule.map((row) => row.couponRub.toFixed(1)),
          },
          {
            label: 'Погашение номинала, RUB',
            values: ofz26238Schedule.map((row) => row.principalRub.toFixed(1)),
          },
          {
            label: 'Итоговый денежный поток, RUB',
            values: ofz26238Schedule.map((row) => row.cashFlowRub.toFixed(1)),
            highlight: true,
          },
        ]}
      />

      <PlotViewer
        title="Схема потоков реальной ОФЗ"
        caption="Из-за того, что облигация торгуется с сильным дисконтом, финальный поток (номинал + купон) в разы превышает текущую цену покупки. Это и создает высокую искомую доходность."
      >
        <CashFlowChart />
      </PlotViewer>

      <ThinkQuestion question="Почему облигация с купоном 7.1% может давать доходность 13.5% к погашению?">
        <p>
          Потому что доходность складывается из двух частей: регулярных купонов и разницы между низкой ценой покупки (~611 руб) 
          и полным номиналом (1000 руб), который будет выплачен в конце.
        </p>
        <p>
          Для аналитика важно видеть оба источника: текущий доход и прирост капитала. Чем дешевле мы покупаем поток будущих денег сегодня, 
          тем выше наша расчетная доходность.
        </p>
      </ThinkQuestion>

      <HandbookDetails title="Подробнее про структуру потока и экономический смысл знака">
        <p>
          В учебных таблицах удобно помнить простое правило: отрицательный знак означает выбытие
          денег из распоряжения инвестора (напр. покупка облигации за 611 руб), положительный — возврат капитала или доход (купоны и номинал).
        </p>
        <p>
          Для ОФЗ промежуточные купоны интерпретируются как доход, а терминальный поток
          одновременно содержит и доход, и возврат вложенного номинала.
        </p>
      </HandbookDetails>

      <section className="content-block">
        <h3 className="section-title">Первый шаг в Python</h3>
        <p className={`mt-3 ${paragraphClass}`}>
          В реальной аналитике формализация почти всегда начинается с таблицы. Как только мы явно
          перечислили даты и суммы, поток становится пригодным для проверки, агрегации и
          последующих финансовых расчетов.
        </p>
        <div className="mt-4">
          <ExecutablePythonBlock
            code={cashFlowCode}
            title="Python: представляем поток ОФЗ как таблицу"
            packages={['pandas']}
            note="Блок можно запустить и менять: например, измените номинал или купонную ставку."
          />
        </div>
      </section>

      <section className="space-y-4">
        <section className="content-block">
          <h3 className="section-title">Полезные функции Python</h3>
          <p className={`mt-3 ${paragraphClass}`}>
            Даже до сложных финансовых формул аналитик постоянно использует базовые операции:
            `sum()` для суммарного притока, `max()` для поиска самого крупного платежа и
            `enumerate()` для прохода по периодам.
          </p>
          <div className="mt-4">
            <ExecutablePythonBlock
              code={`cash_flows = [35.4, 35.4, 35.4, 35.4, 35.4, 35.4, 35.4, 1035.4]

print("Total inflow:", sum(cash_flows))
print("Largest payment:", max(cash_flows))

for period, flow in enumerate(cash_flows, start=1):
    print(f"Period {period}: {flow} RUB")`}
              title="Python: читаем поток базовыми средствами языка"
              note="Этот фрагмент полезен как быстрая самопроверка структуры платежей."
            />
          </div>
        </section>

        <IdeaCard title="Что важно вынести с первого экрана">
          <p>
            Инвестиционный анализ начинается не с красивого коэффициента, а с аккуратного описания
            самого объекта. Если поток и цена входа записаны корректно, расчет доходности становится делом техники.
          </p>
        </IdeaCard>
      </section>

      <KeyIdea title="Ключевой вывод">
        Инвестиционное решение становится предметом анализа только после формализации: мы
        переводим реальный контракт (ОФЗ) в язык потоков, периодов и ограничений, а затем уже считаем
        стоимость, доходность и риск.
      </KeyIdea>

      <nav className="flex justify-end">
        <Link
          to="/practice/1/screen/2"
          className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Далее: 2. Базовые категории
        </Link>
      </nav>
    </article>
  )
}

export default Practice1_Screen1
онтирование.
        </p>
      </ThinkQuestion>

      <HandbookDetails title="Подробнее про структуру потока и экономический смысл знака">
        <p>
          В учебных таблицах удобно помнить простое правило: отрицательный знак означает выбытие
          денег из распоряжения инвестора, положительный — возврат капитала или доход.
        </p>
        <p>
          Для облигации промежуточные купоны интерпретируются как доход, а терминальный поток
          одновременно содержит и доход, и возврат вложенного номинала. Это разделение особенно
          важно, когда мы позже будем считать приведенную стоимость и доходность к погашению.
        </p>
      </HandbookDetails>

      <section className="content-block">
        <h3 className="section-title">Первый шаг в Python</h3>
        <p className={`mt-3 ${paragraphClass}`}>
          В реальной аналитике формализация почти всегда начинается с таблицы. Как только мы явно
          перечислили даты и суммы, поток становится пригодным для проверки, агрегации и
          последующих финансовых расчетов.
        </p>
        <div className="mt-4">
          <ExecutablePythonBlock
            code={cashFlowCode}
            title="Python: представляем реальный поток как таблицу"
            packages={['pandas']}
            note="Блок можно запустить и менять: например, увеличить номинал или купонную ставку и посмотреть, как изменится весь календарь платежей."
          />
        </div>
      </section>

      <section className="space-y-4">
        <section className="content-block">
          <h3 className="section-title">Полезные функции Python</h3>
          <p className={`mt-3 ${paragraphClass}`}>
            Даже до сложных финансовых формул аналитик постоянно использует базовые операции:
            `sum()` для суммарного притока, `max()` для поиска самого крупного платежа и
            `enumerate()` для привязки суммы ко времени.
          </p>
          <div className="mt-4">
            <ExecutablePythonBlock
              code={`cash_flows = [212.5, 212.5, 212.5, 212.5, 212.5, 212.5, 212.5, 10212.5]

print("Total inflow:", sum(cash_flows))
print("Largest payment:", max(cash_flows))

for period, flow in enumerate(cash_flows, start=1):
    print(period, flow)`}
              title="Python: читаем поток базовыми средствами языка"
              note="Этот фрагмент полезен как быстрая самопроверка структуры: мы убеждаемся, что в каждом периоде стоит нужная сумма."
            />
          </div>
        </section>

        <IdeaCard title="Что важно вынести с первого экрана">
          <p>
            Инвестиционный анализ начинается не с красивого коэффициента, а с аккуратного описания
            самого объекта. Если поток записан небрежно, все дальнейшие выводы будут хрупкими.
          </p>
        </IdeaCard>
      </section>

      <KeyIdea title="Ключевой вывод">
        Инвестиционное решение становится предметом анализа только после формализации: мы
        переводим реальный контракт в язык потоков, периодов и ограничений, а затем уже считаем
        стоимость, доходность и риск.
      </KeyIdea>

      <nav className="flex justify-end">
        <Link
          to="/practice/1/screen/2"
          className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Далее: 2. Базовые категории
        </Link>
      </nav>
    </article>
  )
}

export default Practice1_Screen1
