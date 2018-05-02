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
import { Group, IGroupListState, DriveItem } from './GroupList';
import { Icon, IconType, IIconProps } from 'office-ui-fabric-react/lib/Icon';
import { initializeFileTypeIcons, getFileTypeIconProps, FileIconType } from '@uifabric/file-type-icons';
import { GlobalSettings } from 'office-ui-fabric-react/lib/Utilities';
initializeFileTypeIcons();

export interface IGroupDetailsProps {
  group: Group
}

export class GroupDetails extends React.Component<IGroupDetailsProps, any> {
  userId: string;

  constructor(props: IGroupDetailsProps) {
    super(props);
  }

  private getLibraryActivity(driveRecentItems: DriveItem[]): JSX.Element {
    if (driveRecentItems == null || driveRecentItems.length == 0) {
      return null;
    }

    let libraryActivity: JSX.Element = null;

    // hack until file-type-icons is resolved
    let globalSettings = (window as any).__globalSettings__;

    let recentDocs: IDocumentCardPreviewProps = {
      getOverflowDocumentCountText: (overflowCount: number) => `+${overflowCount} more`,
      previewImages: [
      ]
    };


    if (driveRecentItems.length == 1) {
      const doc = driveRecentItems[0];
      let iconProps: IIconProps = {};
      switch (doc.fileType) {
        case "folder":
          iconProps = getFileTypeIconProps({ type: FileIconType.folder, size: 16 });
          break;
        default:
          iconProps = getFileTypeIconProps({ extension: doc.fileType, size: 16 });
          break;
      }

      let previewImage: IDocumentCardPreviewImage = {
        name: doc.title,
        url: doc.webUrl,
        previewImageSrc: doc.thumbnailUrl,
        iconSrc: globalSettings.icons[iconProps.iconName].code.props.src   // hack for file-type-icons
      };
      recentDocs.previewImages.push(previewImage);

      libraryActivity = (
        <DocumentCard>
          <DocumentCardLogo logoIcon='OneDrive' />
          <DocumentCardTitle title='Latest Documents' />
          <DocumentCardPreview previewImages={recentDocs.previewImages} getOverflowDocumentCountText={recentDocs.getOverflowDocumentCountText} />
          <DocumentCardTitle title={doc.title} shouldTruncate={true} />
          <DocumentCardLocation location='View Library' locationHref={this.props.group.driveWebUrl} />
        </DocumentCard>
      );
    }
    else {

      let docs = this.props.group.driveRecentItems;
      for (var i = 0; i < docs.length; i++) {
        let iconProps: IIconProps = {};
        switch (docs[i].fileType) {
          case "folder":
            iconProps = getFileTypeIconProps({ type: FileIconType.folder, size: 16 });
            break;
          default:
            iconProps = getFileTypeIconProps({ extension: docs[i].fileType, size: 16 });
            break;
        }

        let previewImage: IDocumentCardPreviewImage = {
          name: docs[i].title,
          url: docs[i].webUrl,
          iconSrc: globalSettings.icons[iconProps.iconName].code.props.src   // hack for file-type-icons
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

    return libraryActivity;
  }

  public render() {

    const libraryActivity: JSX.Element = this.getLibraryActivity(this.props.group.driveRecentItems);

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