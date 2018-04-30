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
  IDocumentCardLogoProps
} from 'office-ui-fabric-react/lib/DocumentCard';
import { ImageFit } from 'office-ui-fabric-react/lib/Image';
import { TestImages } from './TestImages';



export class GroupDetails extends React.Component<any, any> {
  public render() {
    const previewProps: IDocumentCardPreviewProps = {
      getOverflowDocumentCountText: (overflowCount: number) => `+${overflowCount} more`,
      previewImages: [
        {
          name: '2016 Conference Presentation',
          url: 'http://bing.com',
          previewImageSrc: TestImages.documentPreview,
          iconSrc: TestImages.iconPpt,
          imageFit: ImageFit.cover,
          width: 318,
          height: 196
        },
        {
          name: 'New Contoso Collaboration for Conference Presentation Draft',
          url: 'http://bing.com',
          previewImageSrc: TestImages.documentPreviewTwo,
          iconSrc: TestImages.iconPpt,
          imageFit: ImageFit.cover,
          width: 318,
          height: 196
        },
        {
          name: 'Spec Sheet for design',
          url: 'http://bing.com',
          previewImageSrc: TestImages.documentPreviewThree,
          iconSrc: TestImages.iconPpt,
          imageFit: ImageFit.cover,
          width: 318,
          height: 196
        }
      ],

    };

    return (
      <div>
        <h2>Group Activity</h2>
        <DocumentCard>
          <DocumentCardLogo logoIcon='OneDrive'/>
          <DocumentCardTitle title='Latest Documents' />
          <DocumentCardPreview { ...previewProps } />
          <DocumentCardLocation location='View Library' locationHref='http://microsoft.com' ariaLabel='Location, Marketing Documents' />
        </DocumentCard>

        <br />

      <DocumentCard>
          <DocumentCardLogo logoIcon='OutlookLogo' />
          <DocumentCardTitle title='Latest Conversation' shouldTruncate={true} />
          <DocumentCardTitle title='This is the email content preview, please feel free to give!' shouldTruncate={true} showAsSecondaryTitle={true} />
        <DocumentCardActivity
          activity='Sent March 13, 2018'
          people={
            [
              { name: 'Office 365 Groups Explorer', profileImageSrc: '' },
              { name: 'MOD Administrator', profileImageSrc: ''             },
              { name: 'Annie Lindqvist', profileImageSrc: '', initials: 'AL' },
              { name: 'Roko Kolar', profileImageSrc: '', initials: 'RK' },
              { name: 'Greta Lundberg', profileImageSrc: '', initials: 'GL' }
            ]
          }
          />
          <DocumentCardLocation location='View Inbox' locationHref='http://microsoft.com' ariaLabel='Group inbox' />

        </DocumentCard>
        </div>
    );
  }
}