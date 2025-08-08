import { SearchInput } from '@/features/Search'
import { PageLayout } from '@/widgets/PageLayout'
import cls from './SearchPage.module.less'

const SearchPage = () => {
  return (
    <PageLayout>
      <div className={cls.searchPage}>
        <div className={cls.searchPage__header}>
          <h2 className={cls.searchPage__title}>Поиск</h2>
          <p className={cls.searchPage__description}>
            Поиск по сайту не работает
          </p>
        </div>
        <SearchInput />
      </div>
    </PageLayout>
  )
}

export default SearchPage
