import cls from './Progress.module.less'

interface ProgressProps {
  value: number
}

export const Progress = ({ value }: ProgressProps) => {
  const clampedValue = Math.min(100, Math.max(0, value))

  return (
    <div className={cls.progress}>
      <div
        className={cls.progress__fill}
        style={{
          width: `${clampedValue}%`,
        }}
      ></div>
    </div>
  )
}
