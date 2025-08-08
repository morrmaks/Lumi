import cls from './CategoryPage.module.less'
import { useLocation, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAppDispatch } from '@/shared/lib/hooks'

const CategoryPage = () => {
  const [category, setCategory] = useState({})
  const pathname = useLocation().pathname
  const dispatch = useAppDispatch()
  const categoryId = useParams().category

  useEffect(() => {
    // const res = await dispatch(getCategory(categoryId))
    // setCategory(res)
    // dispatch(breadcrumbNavActions.setName({ path: pathname, name: res.title }))
  })

  return (
    <div className={cls.categoryPage}>
      <p>Категория {categoryId}</p>
    </div>
  )
}

export default CategoryPage
