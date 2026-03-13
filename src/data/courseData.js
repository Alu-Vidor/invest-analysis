const rawCourseData = [
  {
    id: 'practice-1',
    number: 1,
    title: 'Практика 1. Введение в инвестиционный анализ и рабочую среду Python',
    categories: [
      {
        id: 'investment-decision',
        title: 'ОСНОВЫ ИНВЕСТИЦИОННОГО АНАЛИЗА',
        screens: [
          'Инвестиционное решение как объект математического анализа',
          'Базовые категории: доходность, риск, ликвидность, горизонт',
          'Инвестиционный анализ в цифровой экономике',
        ],
      },
      {
        id: 'python-environment',
        title: 'PYTHON И РАБОЧАЯ СРЕДА',
        screens: [
          'Python как инструмент инвестиционного аналитика',
          'Первый мини-анализ данных в Python',
        ],
      },
    ],
  },
  {
    id: 'practice-2',
    number: 2,
    title: 'Практика 2. Денежные потоки и дисконтирование',
    categories: [
      {
        id: 'cash-flow-structure',
        title: 'ДЕНЕЖНЫЕ ПОТОКИ',
        screens: [
          'Структура денежного потока инвестиционного решения',
          'Временная стоимость денег',
          'Операции наращения и дисконтирования',
        ],
      },
      {
        id: 'payment-schemes',
        title: 'ПЛАТЕЖНЫЕ СХЕМЫ И PYTHON',
        screens: [
          'Аннуитеты и типовые платежные схемы',
          'Расчеты приведенной и будущей стоимости в Python',
        ],
      },
    ],
  },
  {
    id: 'practice-3',
    number: 3,
    title: 'Практика 3. Оценка эффективности инвестиционных проектов',
    categories: [
      {
        id: 'project-efficiency',
        title: 'КРИТЕРИИ ЭФФЕКТИВНОСТИ',
        screens: [
          'Критерии инвестиционной эффективности',
          'NPV как базовая модель принятия решения',
          'IRR, PI, срок окупаемости и DPP',
        ],
      },
      {
        id: 'project-comparison',
        title: 'СРАВНЕНИЕ И РЕАЛИЗАЦИЯ',
        screens: [
          'Сравнение проектов при разных ограничениях',
          'Программная реализация критериев в Python',
        ],
      },
    ],
  },
  {
    id: 'practice-4',
    number: 4,
    title: 'Практика 4. Анализ чувствительности и сценарный анализ',
    categories: [
      {
        id: 'uncertainty-and-sensitivity',
        title: 'ЧУВСТВИТЕЛЬНОСТЬ И СЦЕНАРИИ',
        screens: [
          'Неопределенность входных параметров проекта',
          'Чувствительность NPV к ключевым факторам',
          'Сценарии: базовый, оптимистический, пессимистический',
        ],
      },
      {
        id: 'scenario-tools',
        title: 'АНАЛИЗ И АВТОМАТИЗАЦИЯ',
        screens: [
          'Табличный и графический анализ сценариев',
          'Автоматизация сценарных расчетов в Python',
        ],
      },
    ],
  },
  {
    id: 'practice-5',
    number: 5,
    title: 'Практика 5. Риск и вероятностные модели в инвестиционном анализе',
    categories: [
      {
        id: 'risk-metrics',
        title: 'МЕТРИКИ РИСКА',
        screens: [
          'Риск как измеримая характеристика инвестиционного решения',
          'Математическое ожидание, дисперсия, стандартное отклонение',
          'Распределения и вероятностная интерпретация результата',
        ],
      },
      {
        id: 'simulation',
        title: 'МОДЕЛИРОВАНИЕ В PYTHON',
        screens: [
          'Имитационное моделирование и Monte Carlo',
          'Оценка риска проекта в Python',
        ],
      },
    ],
  },
  {
    id: 'practice-6',
    number: 6,
    title: 'Практика 6. Анализ финансовых инструментов на данных',
    categories: [
      {
        id: 'market-assets',
        title: 'ФИНАНСОВЫЕ ИНСТРУМЕНТЫ',
        screens: [
          'Доходность и риск рыночных активов',
          'Акции, облигации, ETF: математические характеристики',
          'Исторические данные и их подготовка',
        ],
      },
      {
        id: 'market-data-analysis',
        title: 'РЫНОЧНЫЕ ДАННЫЕ В PYTHON',
        screens: [
          'Доходности, волатильность, корреляции',
          'Загрузка и анализ рыночных рядов в Python',
        ],
      },
    ],
  },
  {
    id: 'practice-7',
    number: 7,
    title: 'Практика 7. Портфельный анализ и оптимизация',
    categories: [
      {
        id: 'portfolio-theory',
        title: 'ТЕОРИЯ ПОРТФЕЛЯ',
        screens: [
          'Диверсификация как математический принцип',
          'Ожидаемая доходность и риск портфеля',
          'Ковариационная структура активов',
        ],
      },
      {
        id: 'markowitz-and-python',
        title: 'ОПТИМИЗАЦИЯ В PYTHON',
        screens: [
          'Модель Марковица и эффективная граница',
          'Построение и оптимизация портфеля в Python',
        ],
      },
    ],
  },
]

function withScreenRoutes(practice) {
  let screenCounter = 1

  return {
    ...practice,
    route: `/practice/${practice.number}`,
    categories: practice.categories.map((category) => ({
      ...category,
      screens: category.screens.map((title) => {
        const screen = {
          id: `${practice.id}-screen-${screenCounter}`,
          number: screenCounter,
          title,
          route: `/practice/${practice.number}/screen/${screenCounter}`,
        }
        screenCounter += 1
        return screen
      }),
    })),
  }
}

export const courseData = rawCourseData.map(withScreenRoutes)
