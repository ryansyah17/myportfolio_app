import { useTranslation } from 'react-i18next'
import { useEducations } from '../../hooks/useEducation'
import { useWorkHistories } from '../../hooks/useWork'
import Loading from '../../components/ui/Loading'

const AboutPage = () => {
  const { t } = useTranslation()
  const { data: educations, isLoading: loadEdu } = useEducations()
  const { data: works, isLoading: loadWork } = useWorkHistories()

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Bio */}
      <section className="mb-16">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-6">
          {t('about.title')}
        </h1>
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold shrink-0">
              R
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                Ryansyah Putra
              </h2>
              <p className="text-blue-600 dark:text-blue-400 font-medium mb-4">
                {t('about.role')}
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {t('about.bio')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Work History */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          {t('about.work_title')}
        </h2>
        {loadWork && <Loading />}
        <div className="space-y-4">
          {works?.map((work) => (
            <div key={work.id}
              className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border-l-4 border-blue-500">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-bold text-gray-800 dark:text-white text-lg">{work.position}</h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium">{work.company}</p>
                  {work.description && (
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{work.description}</p>
                  )}
                </div>
                <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-3 py-1 rounded-full shrink-0">
                  {work.start_date} — {work.is_current ? t('about.current') : work.end_date}
                </span>
              </div>
            </div>
          ))}
          {works?.length === 0 && !loadWork && (
            <p className="text-gray-400 text-center py-8">{t('about.empty_work')}</p>
          )}
        </div>
      </section>

      {/* Education */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          {t('about.edu_title')}
        </h2>
        {loadEdu && <Loading />}
        <div className="space-y-4">
          {educations?.map((edu) => (
            <div key={edu.id}
              className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border-l-4 border-purple-500">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-bold text-gray-800 dark:text-white text-lg">{edu.school}</h3>
                  <p className="text-purple-600 dark:text-purple-400 font-medium">
                    {edu.degree} — {edu.field_of_study}
                  </p>
                  {edu.description && (
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{edu.description}</p>
                  )}
                </div>
                <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-3 py-1 rounded-full shrink-0">
                  {edu.start_year} — {edu.end_year}
                </span>
              </div>
            </div>
          ))}
          {educations?.length === 0 && !loadEdu && (
            <p className="text-gray-400 text-center py-8">{t('about.empty_edu')}</p>
          )}
        </div>
      </section>
    </div>
  )
}

export default AboutPage