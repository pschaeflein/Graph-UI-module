import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  DocumentCard,
  DocumentCardActions,
  DocumentCardActivity,
  DocumentCardLocation,
  DocumentCardPreview,
  DocumentCardTitle,
  DocumentCardLogo,
  DocumentCardStatus,
  IDocumentCardPreviewProps,
  IDocumentCardLogoProps,
  DocumentCardType,
  IDocumentCardPreviewImage
} from 'office-ui-fabric-react/lib/DocumentCard';
import { ImageFit } from 'office-ui-fabric-react/lib/Image';
import { TestImages } from './TestImages';
import { GroupCard } from './GroupCard';
import { Group, IGroupListState } from './GroupList';
import { Icon, IconType } from 'office-ui-fabric-react/lib/Icon';

export interface IGroupDetailsProps {
  group: Group
}

export class GroupDetails extends React.Component<IGroupDetailsProps, any> {
  userId: string;

  constructor(props: IGroupDetailsProps) {
    super(props);
  }


  public render() {
    let recentDocs: IDocumentCardPreviewProps = {
      getOverflowDocumentCountText: (overflowCount: number) => `+${overflowCount} more`,
      previewImages: [
      ]
    };

    let libraryActivity = null;
    if (this.props.group.driveRecentItems && this.props.group.driveRecentItems.length > 1) {
      let docs = this.props.group.driveRecentItems;
      for (var i = 0; i < docs.length; i++) {
        let iconName = "";
        let fileName = "";
        let fileParts = docs[i].name.split(".");
        if (fileParts.length > 1) {
          fileName = fileParts[0];
          iconName = fileParts[1];
        }
        else {
          fileName = docs[i].name;
          iconName = "FabricFolder";
        }
        let previewImage: IDocumentCardPreviewImage = {
          name: fileName,
          url: docs[i]["@microsoft.graph.downloadUrl"],
          iconSrc: `https://static2.sharepointonline.com/files/fabric/assets/brand-icons/document/svg/${iconName}_16x1_5.svg`
        };
        recentDocs.previewImages.push(previewImage);
      }

      libraryActivity = (
        <DocumentCard>
          <DocumentCardLogo logoIcon='OneDrive' />
          <DocumentCardTitle title='Latest Documents' />
          <DocumentCardPreview previewImages={recentDocs.previewImages} getOverflowDocumentCountText={recentDocs.getOverflowDocumentCountText} />
          <DocumentCardLocation location='View Library' locationHref={this.props.group.driveWebUrl} />
        </DocumentCard>
      );
    }

    let mailboxActivity = null;
    if (this.props.group.latestConversation) {
      let convo = this.props.group.latestConversation;
      let activityMessage = `Sent ${convo.lastDelivered}`;
      let people = [];
      for (var i = 0; i < convo.uniqueSenders.length; i++) {
        people.push({ name: convo.uniqueSenders[i] });
      }
      mailboxActivity = (
        <DocumentCard>
          <DocumentCardLogo logoIcon='OutlookLogo' />
          <DocumentCardTitle title='Latest Conversation' shouldTruncate={true} />
          <DocumentCardTitle title={convo.topic} shouldTruncate={true} showAsSecondaryTitle={true} />
          <DocumentCardActivity
            activity={activityMessage}
            people={people}
          />
          <DocumentCardLocation location='View Inbox' locationHref={this.props.group.mailboxWebUrl} ariaLabel='Group inbox' />
        </DocumentCard>
      );
    }

    const activity = (this.props.group.groupType === "Unified") ? (
      <div>
        <h2>Group Activity</h2>
        {libraryActivity}
        <br />
        {mailboxActivity}
      </div>
    ) : (null);

    return (
      <div>
        <h2>Group Information</h2>
        <DocumentCard>
          <GroupCard group={this.props.group} />
        </DocumentCard>
        {activity}
      </div>
    );

    //<DocumentCardActions
    //  actions={[
    //    {
    //      iconProps: { iconName: 'send' },
    //      onClick: (ev: any) => {
    //        console.log('ShareA Action');
    //        ev.preventDefault();
    //        ev.stopPropagation();
    //      },
    //      ariaLabel: 'share action'
    //    }
    //  ]} />

  }
}