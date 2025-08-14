import { PageLayout } from '@/widgets/PageLayout'
import {
  BannerCarousel,
  CategoriesSection,
  ConfiguratorPromoBlock,
} from '@/entities/MainSection'
import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components'
import { bannersReducer } from '@/features/Banners'
import cls from './MainPage.module.less'

const initialReducers: ReducerList = {
  banners: bannersReducer,
}

const MainPage = () => {
  return (
    <PageLayout>
      <div className={cls.mainPage}>
        <DynamicModuleLoader
          reducers={initialReducers}
          removeAfterUnmount={false}
        >
          <BannerCarousel />
        </DynamicModuleLoader>
        <CategoriesSection />
        <ConfiguratorPromoBlock />
      </div>
    </PageLayout>
  )
}

export default MainPage
