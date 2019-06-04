import React, { useContext, useMemo } from 'react'

import classNames from 'classnames'
import { defineMessages } from 'react-intl'

import CategoryMenu from './components/CategoryMenu'
import Item from './components/Item'
import LevelContext from './components/LevelContext'
import MenuContext from './components/MenuContext'
import { MenuItemSchema } from './MenuItem'

import styles from './Menu.css'

const TypographyMap: Record<string, string> = {
  body: 't-body',
  heading1: 't-heading-1',
  heading2: 't-heading-2',
  heading3: 't-heading-3',
  heading4: 't-heading-4',
  heading5: 't-heading-5',
  mini: 't-mini',
  small: 't-small',
}

const Menu: StorefrontFunctionComponent<MenuSchema> = ({
  orientation = 'horizontal',
  textType,
  title,
  categoryId,
  ...props
}) => {
  const level = useContext(LevelContext)
  const menuContext = useMemo(
    () => ({
      hasTitle: title || categoryId ? true : false,
      orientation,
      textType: textType ? TypographyMap[textType] : TypographyMap.body,
    }),
    [orientation, textType]
  ) 

  return (
    <LevelContext.Provider value={level + 1}>
      <MenuContext.Provider value={menuContext}>
        <nav>
          <ul
            className={classNames(styles.menuContainer, 'list flex pl0 mv0', {
              'flex-column': orientation === 'vertical',
              'flex-row': orientation === 'horizontal',
            })}
          >
            {!categoryId && title && <Item {...title} isTitle />}
            {categoryId && <CategoryMenu categoryId={categoryId} />}
            {props.children}
          </ul>
        </nav>
      </MenuContext.Provider>
    </LevelContext.Provider>
  )
}

interface MenuSchema {
  orientation?: 'vertical' | 'horizontal'
  categoryId?: number
  textType?: Typography
  title?: MenuItemSchema,
  additionalDef?: string
}

enum Typography {
  heading1 = 't-heading-1',
  heading2 = 't-heading-2',
  heading3 = 't-heading-3',
  heading4 = 't-heading-4',
  heading5 = 't-heading-5',
  body = 't-body',
  small = 't-small',
  mini = 't-mini',
}

const messages = defineMessages({
  horizontalLabel: {
    defaultMessage: '',
    id: 'admin/editor.menu.orientation.horizontal.label',
  },
  menuTitle: {
    defaultMessage: '',
    id: 'admin/editor.future-menu.title',
  },
  orientationTitle: {
    defaultMessage: '',
    id: 'admin/editor.menu.orientation.title',
  },
  typographyTitle: {
    defaultMessage: '',
    id: 'admin/editor.menu.typography.title',
  },
  verticalLabel: {
    defaultMessage: '',
    id: 'admin/editor.menu.orientation.vertical.label',
  },
  defTitle: {
    defaultMessage: '',
    id: 'admin/editor.menu.additionalDef.title',
  },
  noneDef: {
    defaultMessage: '',
    id: 'admin/editor.menu.def.none',
  },
  titleDef: {
    defaultMessage: '',
    id: 'admin/editor.menu.def.title',
  },
  categoryDef: {
    defaultMessage: '',
    id: 'admin/editor.menu.def.category',
  },
  categoryIdTitle: {
    defaultMessage: '',
    id: 'admin/editor.menu.categoryId.title',
  },
})

Menu.getSchema = () => {
  // tslint:disable: object-literal-sort-keys
  return {
    title: messages.menuTitle.id,
  }
}

export default Menu
