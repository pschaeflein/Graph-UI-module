import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  IObjectWithKey,
  ISelection,
  Selection,
  SelectionMode,
  SelectionZone
} from 'office-ui-fabric-react/lib/Selection';
import {
  FocusZone,
  FocusZoneDirection
} from 'office-ui-fabric-react/lib/FocusZone';
import { List } from 'office-ui-fabric-react/lib/List';
import { Image, ImageFit } from 'office-ui-fabric-react/lib/Image';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { GroupDetails } from './GroupDetails';
import { ColorClassNames, FontClassNames } from '@uifabric/styling';
import './GroupList.scss';

export interface IGroupListState {
  items: Group[];
  selection: ISelection;
  selectionMode?: SelectionMode;
  canSelect?: string;
  showPanel: boolean;
}

export interface IGroupListItemProps {
  item?: Group;
  itemIndex?: number;
  selection?: ISelection;
  selectionMode?: SelectionMode;
}

export class Group implements IObjectWithKey {
  key: string;
  //  id: string;
  name: string;
  description: string;
  groupType: string;
  mailNickname: string;
  thumbnail: string;
  visibility: string;
}


export class GroupList extends React.Component<{}, IGroupListState> {
  userId: string = null;
  private _hasMounted: boolean;

  constructor(props: any) {
    super(props);

    this._hasMounted = false;
    this._onSelectionChanged = this._onSelectionChanged.bind(this);
    this._onItemInvoked = this._onItemInvoked.bind(this);


    this.state = {
      items: [],
      selection: new Selection({ onSelectionChanged: this._onSelectionChanged }),
      selectionMode: SelectionMode.single,
      canSelect: 'all',
      showPanel: false
    };
  }

  public componentDidMount() {
    this.userId = (window as any).userId;
    let data: Group[] = (window as any).groupData;
    this.state.selection.setItems(data, true);
    this.setState({
      items: data
    });

    for (let item of data) {
      this.getPicture(this.userId, item.key)
        .then((pictureUrl) => this.updateStateItem(item.key, pictureUrl.photoUrl));
    }

    this._hasMounted = true;
  }

  componentWillUnmount() {
  }

  updateStateItem(id: string, photoUrl: string) {
    let items = [...this.state.items];
    let item = { ...items.filter(i => i.key === id)[0] };
    item.thumbnail = photoUrl;
    let index = items.map(function (e) { return e.key; }).indexOf(item.key);
    items[index] = item;
    this.setState({ items: items });
  }

  private getPicture(userId: string, id: string): Promise<any> {
    return fetch('/Groups/Photo?id=' + id + '&userId=' + userId)
      .then((response) => response.json())
      .catch((reason) => {
        console.log(reason);
      });
  }

  private _onSelectionChanged(): void {
    console.log("onSelectionChanged");
    if (this._hasMounted) {
      this.forceUpdate();
    }
  }

  private _onItemInvoked = (item: any, index: number): void => {
    console.log('Item invoked', item, index);
    this.setState({ showPanel: true });
  }

  private _onClosePanel = (): void => {
    this.setState({ showPanel: false });
  }


  public render() {
    const { items, selection } = this.state;
    return (
      <div>
        <Panel
          isOpen={this.state.showPanel}
          type={PanelType.smallFixedFar}
          onDismiss={this._onClosePanel}
        >
          <GroupDetails />
        </Panel>
        <FocusZone direction={FocusZoneDirection.vertical}>
          <SelectionZone
            selection={selection}
            // tslint:disable-next-line:jsx-no-lambda
            onItemInvoked={this._onItemInvoked}
          >
            <div className='ms-ListGhostingExample-container' data-is-scrollable={true}>
              <List
                items={items}
                onRenderCell={this._onRenderCell}
              />
            </div>
          </SelectionZone>
        </FocusZone>
      </div>
    );
  }

  private _onRenderCell(item: any, index: number, isScrolling: boolean): JSX.Element {
    return (
      <div className='ms-ListGhostingExample-itemCell' data-is-focusable={true} data-selection-index={index} data-selection-invoke={true}>
        <Image
          className='ms-ListGhostingExample-itemImage'
          src={isScrolling ? undefined : item.thumbnail}
          width={50}
          height={50}
          imageFit={ImageFit.cover}
        />
        <div className='ms-ListGhostingExample-itemContent'>
          <div className='ms-ListGhostingExample-itemName ms-fontSize-l'>{item.name}</div>
          <div className='ms-ListGhostingExample-itemIndex'>{item.mailNickname} {(item.visibility) ? '(' + item.visibility + ')' : ''}</div>
        </div>
      </div>
    );
  }
}