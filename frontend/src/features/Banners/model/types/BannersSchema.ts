export interface IBannerCarousel {
  id: number
  image: string
  title: string
  description: string
  route: string
}

export interface BannersSchema {
  mainBannersCarousel: IBannerCarousel[]
}
