import { SearchInput } from '@/features/Search'
import { PageLayout } from '@/widgets/PageLayout'

const SearchPage = () => {
  return (
    <PageLayout>
      <div>
        <h1>Поиск</h1>
        <SearchInput />
      </div>
    </PageLayout>
  )
}

export default SearchPage
