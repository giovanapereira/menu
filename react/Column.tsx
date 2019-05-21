import React, { FunctionComponent } from 'react'
import { generateBlockClass } from '@vtex/css-handles'
import classNames from 'classnames'
import style from './styles/style.css'

const Column: FunctionComponent<Props> = ({ blockClass, children }) => {
  const classes = generateBlockClass(style.column, blockClass)
  return <div className={classNames(classes)}>{children}</div>
}

interface Props {
  children: React.ReactChildren
  blockClass: string
}

export default Column
