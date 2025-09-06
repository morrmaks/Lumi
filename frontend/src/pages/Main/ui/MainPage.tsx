import { PageLayout } from '@/widgets/PageLayout'
import {
  BannerCarousel,
  CategoriesSection,
  ConfiguratorPromoBlock,
} from '@/entities/MainSection'
import cls from './MainPage.module.less'
import { Seo } from '@/shared/lib/components'

const MainPage = () => {
  return (
    <PageLayout>
      <Seo title="Главная" />
      <div className={cls.mainPage}>
        <BannerCarousel />
        <CategoriesSection />
        <ConfiguratorPromoBlock />
      </div>
    </PageLayout>
  )
}

export default MainPage
