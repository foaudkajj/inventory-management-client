import React, { useMemo } from 'react';
import ContextMenu, { Position } from 'devextreme-react/context-menu';
import List from 'devextreme-react/list';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../contexts/auth';

import './user-panel.scss';

interface IProps {
  menuMode: 'context' | 'list'
}

export default function ({ menuMode }: IProps) {
  const { user, logOut } = useAuth();
  const navigation = useNavigate();
  const menuItems = useMemo(() => ([
    {
      text: 'Profile',
      icon: 'user'
    },
    {
      text: 'Logout',
      icon: 'runner',
      onClick: () => {
        navigation('/login');
        logOut()
      }
    }
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
