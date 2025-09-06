import { SearchInput } from '@/features/Search'
import { PageLayout } from '@/widgets/PageLayout'
import cls from './SearchPage.module.less'
import { Placeholders } from '@/shared/consts'
import { Seo } from '@/shared/lib/components'

const SearchPage = () => {
  return (
    <PageLayout>
      <Seo title="Поиск" />
      <div className={cls.searchPage}>
        <div className={cls.searchPage__header}>
          <h2 className={cls.searchPage__title}>
            {Placeholders.pages.search.mainText}
          </h2>
          <p className={cls.searchPage__description}>
            {Placeholders.pages.search.describeText}
          </p>
        </div>
        <SearchInput />
      </div>
    </PageLayout>
  )
}

export default SearchPage
