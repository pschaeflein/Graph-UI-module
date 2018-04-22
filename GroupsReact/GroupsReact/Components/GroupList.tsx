import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  FocusZone,
  FocusZoneDirection
} from 'office-ui-fabric-react/lib/FocusZone';
import { List } from 'office-ui-fabric-react/lib/List';
import { Image, ImageFit } from 'office-ui-fabric-react/lib/Image';
import { ColorClassNames, FontClassNames } from '@uifabric/styling';
import './GroupList.scss';

export interface IGroupListState {
  items: Group[];
}

export class Group {
  id: string;
  name: string;
  description: string;
  groupType: string;
  mailNickname: string;
  thumbnail: string;
  visibility: string;
}

export class GroupList extends React.Component<{}, IGroupListState> {
  constructor(props: any) {
    super(props);
    this.state = { items: [] };
  }

  userId: string = null;

  public componentDidMount() {
    this.userId = (window as any).userId;
    let data:Group[] = (window as any).groupData;
    this.setState({
      items:data
    });

    for (let item of data) {
      this.getPicture(this.userId, item.id)
        .then((pictureUrl) => this.updateStateItem(item.id, pictureUrl.photoUrl));
    }
  }

  componentWillUnmount() {
  }

  updateStateItem(id: string, photoUrl:string) {
    let items = [...this.state.items];
    let item = { ...items.filter(i => i.id === id)[0] };
    item.thumbnail = photoUrl;
    let index = items.map(function (e) { return e.id; }).indexOf(item.id);
    items[index] = item;
    this.setState({ items }); 
  }

  private getPicture(userId:string, id: string): Promise<any> {
    return fetch('/Groups/Photo?id=' + id + '&userId=' + userId)
      .then((response) => response.json())
      .catch((reason) => {
        console.log(reason);
      });
  }

  public render() {
    const { items } = this.state;
    return (
      <FocusZone direction={FocusZoneDirection.vertical}>
        <div className='ms-ListGhostingExample-container' data-is-scrollable={true}>
          <List
            items={ items }
            onRenderCell={this._onRenderCell}
          />
        </div>
      </FocusZone>
    );
  }

  private _onRenderCell(item: any, index: number, isScrolling: boolean): JSX.Element {
    return (
      <div className='ms-ListGhostingExample-itemCell' data-is-focusable={true}>
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