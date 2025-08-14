import cls from './BannerCarousel.module.less'
import { Skeleton } from '@/shared/ui/Skeleton'

export const BannerCarouselSkeleton = () => {
  return (
    // <div className={cls.bannerCarousel}>
    <Skeleton className={cls.bannerCarousel} />
    //   <ul
    //     className={cls.bannerCarousel__banners}
    //   >
    //     {banners.map((banner, index) =>
    //       <li
    //         key={banner.id}
    //         className={classNames(
    //           cls.bannerCarousel__bannerItem,
    //           {[cls.bannerCarousel__bannerItem_active]: currentBanner === index}
    //         )}
    //       >
    //         <AppLink to={banner.route}>
    //           <AppImage
    //             src={banner.image}
    //             alt={banner.title}
    //             className={cls.bannerCarousel__bannerItem_image}
    //           />
    //           <div  className={cls.bannerCarousel__bannerItem_content}>
    //             <h3 className={cls.bannerCarousel__bannerItem_title}>{banner.title}</h3>
    //             <p className={cls.bannerCarousel__bannerItem_description}>{banner.description}</p>
    //           </div>
    //         </AppLink>
    //       </li>
    //     )}
    //   </ul>
    // </div>
  )
}
