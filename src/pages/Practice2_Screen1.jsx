import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import CourseHeader from '../components/CourseHeader'
import RecapBlock from '../components/RecapBlock'
import IdeaCard from '../components/IdeaCard'

const contextNotes = [
  {
    title: 'Статистическая значимость',
    text: 'Вы часто будете слышать фразу «результат статистически значим». Это не значит, что результат важный или большой. Это означает лишь одно: вероятность того, что мы получили такую разницу чисто случайно, ничтожно мала.',
  },
  {
    title: 'Инструментарий',
    text: 'В этой практике главным инструментом перестает быть `pandas` (хотя мы продолжаем использовать его для хранения таблиц). На сцену выходит модуль `scipy.stats` — мощнейшая библиотека Python, в которой зашиты сотни статистических критериев.',
  },
]

function Practice2_Screen1({ setContextNotes }) {
  useEffect(() => {
    setContextNotes(contextNotes)
  }, [setContextNotes])

  return (
    <article className="space-y-6">
      <CourseHeader
        badge="Практика 2 -> ВВЕДЕНИЕ"
        title="Проверка гипотез: Суд над данными"
        subtitle="Как перестать просто описывать выборку и начать делать выводы о мире."
      />

      <RecapBlock title="Что мы умеем после Практики 1">
        <p>
          На прошлых занятиях мы разобрались с <strong>описательной статистикой</strong>. Мы
          научились брать сырой массив данных, находить его центр (среднее, медиана), оценивать
          разброс (дисперсия) и смотреть на форму (гистограммы, ECDF). Мы точно знаем,{' '}
          <em>как выглядят</em> данные в нашем датасете.
        </p>
      </RecapBlock>

      <section className="content-block space-y-5">
        <div className="space-y-4 text-base leading-relaxed text-slate-700 dark:text-slate-200">
          <p>
            Но вот в чем проблема: бизнес или наука редко платят просто за красивые графики. Им
            нужны решения.
          </p>
          <p>
            Представьте, что вы внедрили новый дизайн кнопки на сайте. В старом дизайне конверсия
            была 5%, в новом — 5.2%. Описательная статистика скажет вам: «Да, 5.2 больше, чем
            5.0». Но значит ли это, что новый дизайн <em>действительно</em> лучше? Или эти 0.2% —
            просто случайный шум, погрешность выборки, и завтра конверсия упадет обратно?
          </p>
        </div>

        <IdeaCard title="Описание vs Выводы">
          <strong>Описательная статистика</strong> констатирует факты о <em>выборке</em>.
          <strong> Выводная статистика</strong> позволяет с математической уверенностью перенести
          эти факты на всю <em>генеральную совокупность</em>. Она отвечает на вопрос: «То, что мы
          видим — это закономерность или случайность?».
        </IdeaCard>

        <section className="rounded-[1.5rem] border border-sky-200 bg-sky-50/80 p-6 dark:border-sky-900/50 dark:bg-sky-950/20">
          <h3 className="text-lg font-semibold tracking-tight text-sky-900 dark:text-sky-200">
            План занятия:
          </h3>
          <ol className="mt-4 space-y-3 text-base leading-relaxed text-slate-700 dark:text-slate-200">
            <li>
              <strong>1. Аналогия с судом:</strong> разберем философский смысл гипотез <code>H_0</code>{' '}
              и <code>H_1</code>.
            </li>
            <li>
              <strong>2. Ошибки I и II рода:</strong> почему нельзя быть правым на 100% и кого в
              итоге «посадят».
            </li>
            <li>
              <strong>3. P-value:</strong> переведем самый страшный термин статистики на
              человеческий язык.
            </li>
            <li>
              <strong>4. Критерии в коде:</strong> научимся проверять гипотезы о распределении
              (нормальность и хи-квадрат) с помощью <code>scipy.stats</code>.
            </li>
            <li>
              <strong>5. Лабораторные работы 2.1 и 2.2:</strong> ваши самостоятельные проекты по
              проверке распределений.
            </li>
          </ol>
        </section>
      </section>

      <nav className="flex justify-end">
        <Link
          to="/practice/2/screen/2"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Далее: 2. Аналогия с судом (H0 и H1)
          <ArrowRight size={16} />
        </Link>
      </nav>
    </article>
  )
}

export default Practice2_Screen1
