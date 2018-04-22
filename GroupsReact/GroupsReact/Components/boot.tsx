﻿// add an export line for each component. This forces webpack to pick them all up.
import './site.css';
import 'office-ui-fabric-react/dist/css/fabric.css';
import { GroupList, Group, IGroupListState } from './GroupList';

// items actually used on this page
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Banner, IBannerProps } from './banner';
import { NavMenu } from './NavMenu';

export function renderBanner(name: string, email: string, imageUrl: string) {
  ReactDOM.render(
    <Banner name={name} email={email} imageUrl={imageUrl} />,
    document.getElementById('react-banner')
  );
}

export function renderNavMenu() {
  ReactDOM.render(
    <NavMenu />,
    document.getElementById('react-navmenu')
  );
}

export function RenderGroupList(groupList: Group[]) {
  const props: IGroupListState = { items: groupList };
  ReactDOM.render(
    <GroupList></GroupList>,
    document.getElementById('react-groupList')
  );
}

//renderBanner();
//renderNavMenu();

// Allow Hot Module Replacement
if (module.hot) {
  module.hot.accept();
}