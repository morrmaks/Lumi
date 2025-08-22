import { PageLayout } from '@/widgets/PageLayout'
import {
  BannerCarousel,
  CategoriesSection,
  ConfiguratorPromoBlock,
} from '@/entities/MainSection'
import cls from './MainPage.module.less'

const MainPage = () => {
  return (
    <PageLayout>
      <div className={cls.mainPage}>
        <BannerCarousel />
        <CategoriesSection />
        <ConfiguratorPromoBlock />
      </div>
    </PageLayout>
  )
}

export default MainPage
