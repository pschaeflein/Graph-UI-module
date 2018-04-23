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
import { TestImages } from './GroupDetailsTestImages';



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
    const logoProps: IDocumentCardLogoProps = {
      logoIcon: 'OutlookLogo'
    };

    return (
      <div>
        <h2>Group Activity</h2>
        <DocumentCard>
          <DocumentCardPreview { ...previewProps } />
          <DocumentCardLocation location='Marketing Documents' locationHref='http://microsoft.com' ariaLabel='Location, Marketing Documents' />
          <DocumentCardTitle title='Latest Documents' />
          <DocumentCardActivity
            activity='Created Feb 23, 2016'
            people={
              [
                { name: 'Annie Lindqvist', profileImageSrc: TestImages.personaFemale },
                { name: 'Roko Kolar', profileImageSrc: '', initials: 'JH' },
                { name: 'Greta Lundberg', profileImageSrc: TestImages.personaFemale }
              ]
            }
          />
          <DocumentCardActions
            actions={
              [
                {
                  iconProps: { iconName: 'Share' },
                  onClick: (ev: any) => {
                    console.log('You clicked the share action.');
                    ev.preventDefault();
                    ev.stopPropagation();
                  },
                  ariaLabel: 'share action'
                },
                {
                  iconProps: { iconName: 'Pin' },
                  onClick: (ev: any) => {
                    console.log('You clicked the pin action.');
                    ev.preventDefault();
                    ev.stopPropagation();
                  },
                  ariaLabel: 'pin action'
                },
                {
                  iconProps: { iconName: 'Ringer' },
                  onClick: (ev: any) => {
                    console.log('You clicked the ringer action.');
                    ev.preventDefault();
                    ev.stopPropagation();
                  },
                  ariaLabel: 'ringer action'
                },
              ]
            }
            views={432}
          />
        </DocumentCard>

        <br />

      <DocumentCard>
        <DocumentCardLogo { ...logoProps } />
        <div className='ms-ConversationTile-TitlePreviewArea' >
          <DocumentCardTitle title='Conversation about anual report' shouldTruncate={true} />
          <DocumentCardTitle title='This is the email content preview, please feel free to give!' shouldTruncate={true} showAsSecondaryTitle={true} />
        </div>
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
        </DocumentCard>
        </div>
    );
  }
}