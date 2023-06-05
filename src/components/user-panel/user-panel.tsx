import React, { useMemo, useTransition } from 'react';
import ContextMenu, { Position } from 'devextreme-react/context-menu';
import List from 'devextreme-react/list';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/auth';
import './user-panel.scss';
import { useTranslation } from 'react-i18next';

interface IProps {
  menuMode: 'context' | 'list'
}

export default function ({ menuMode }: IProps) {
  const { user, logOut } = useAuth();
  const navigation = useNavigate();
  const { t, i18n } = useTranslation()

  const menuItems = useMemo(() => ([
    {
      text: t('user-panel.profile'),
      icon: 'user'
    },
    {
      text: t('user-panel.logout'),
      icon: 'runner',
      onClick: () => {
        navigation('/login');
        logOut()
      }
    },
    {
      text: t('user-panel.languages'),
      icon: 'fa-solid fa-language',
      items: [
        {
          text: t('languages.english'),
          onClick: () => {
            i18n.changeLanguage('en');
            window.location.reload()
          }
        },
        {
          text: t('languages.turkish'),
          onClick: () => {
            i18n.changeLanguage('tr');
            window.location.reload()
          }
        },
        {
          text: t('languages.arabic'),
          onClick: () => {
            i18n.changeLanguage('ar');
            window.location.reload()
          }
        }
      ],

    },
  ]), [logOut, navigation]);

  return (
    <div className={'user-panel'}>
      <div className={'user-info'}>
        <div className={'image-container'}>
          <div
            style={{
              background: `url(https://media-exp1.licdn.com/dms/image/C4E03AQFR22tJZ3KvpQ/profile-displayphoto-shrink_400_400/0/1636040503228?e=1671667200&v=beta&t=hAc_sAXPfyLgqFlBzujnRDvot7VvoZydSEDvE36GaVM) no-repeat #fff`,
              backgroundSize: 'cover'
            }}
            className={'user-image'} />
        </div>
        <div className={'user-name'}>{user?.name}</div>
      </div>

      {menuMode === 'context' && (
        <ContextMenu
          items={menuItems}
          target={'.user-button'}
          showEvent={'dxclick'}
          width={210}
          cssClass={'user-menu'}
        >
          <Position my={{ x: 'top', y: 'center' }} at={{ x: 'bottom', y: 'center' }} />
        </ContextMenu>
      )}
      {menuMode === 'list' && (
        <List className={'dx-toolbar-menu-action'} items={menuItems} />
      )}
    </div>
  );
}
