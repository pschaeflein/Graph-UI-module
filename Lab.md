Install nvm (https://github.com/coreybutler/nvm-windows)

install node LTS

Launch VS
  Tools | Options
    Projects and Solutions
      Web Package Management
        External Web Tools
  Move $(PATH) to top of list

install NPM task runner (https://marketplace.visualstudio.com/items?itemName=MadsKristensen.NPMTaskRunner)

> Maybe not...
Install Yarn (npm install -g yarn) or (https://yarnpkg.com/latest.msi) or (choco install yarn)
install Yarn installer (https://marketplace.visualstudio.com/items?itemName=MadsKristensen.YarnInstaller)

Visual Studio
  Tools | Options
    Web
      Yarn Installer
  Set **Install on Save** to Yes

< Maybe not...

## Reference
https://blogs.msdn.microsoft.com/webdev/2017/02/14/building-single-page-applications-on-asp-net-core-with-javascriptservices/


## Developer command prompt

mkdir GroupExplorer
chdir GroupExplorer
launch VS

File>New Project
  ASP.NET Core MVC

Edit csproj
  add to <PropertyGroup>
    <TypeScriptCompileBlocked>true</TypeScriptCompileBlocked>
  add Targets from SpaServices
    <Target Name="DebugRunWebpack" BeforeTargets="Build" Condition=" '$(Configuration)' == 'Debug' And !Exists('wwwroot\dist') ">
      <!-- Ensure Node.js is installed -->
      <Exec Command="node --version" ContinueOnError="true">
        <Output TaskParameter="ExitCode" PropertyName="ErrorCode" />
      </Exec>
      <Error Condition="'$(ErrorCode)' != '0'" Text="Node.js is required to build and run this project. To continue, please install Node.js from https://nodejs.org/, and then restart your command prompt or IDE." />

      <!-- In development, the dist files won't exist on the first run or when cloning to
           a different machine, so rebuild them if not already present. -->
      <Message Importance="high" Text="Performing first-run Webpack build..." />
      <Exec Command="node node_modules/webpack/bin/webpack.js --config webpack.config.vendor.js" />
      <Exec Command="node node_modules/webpack/bin/webpack.js" />
    </Target>

    <Target Name="PublishRunWebpack" AfterTargets="ComputeFilesToPublish">
      <!-- As part of publishing, ensure the JS resources are freshly built in production mode -->
      <Exec Command="npm install" />
      <Exec Command="node node_modules/webpack/bin/webpack.js --config webpack.config.vendor.js --env.prod" />
      <Exec Command="node node_modules/webpack/bin/webpack.js --env.prod" />

      <!-- Include the newly-built files in the publish output -->
      <ItemGroup>
        <DistFiles Include="wwwroot\dist\**" />
        <ResolvedFileToPublish Include="@(DistFiles->'%(FullPath)')" Exclude="@(ResolvedFileToPublish)">
          <RelativePath>%(DistFiles.Identity)</RelativePath>
          <CopyToPublishDirectory>PreserveNewest</CopyToPublishDirectory>
        </ResolvedFileToPublish>
      </ItemGroup>
    </Target>

remove bundleconfig.json
Add tsconfig.json

Add webpack.config.js

Add package.json
  DevDependencies
    "@types/prop-types": "15.5.2",
    "@types/react": "^16.3.11",
    "@types/react-dom": "^16.0.5",
    "@types/webpack-env": "1.13.0",
    "aspnet-webpack": "^2.0.3",
    "awesome-typescript-loader": "3.2.1",
    "css-loader": "0.28.4",
    "extract-text-webpack-plugin": "2.1.2",
    "office-ui-fabric-react": "5.82.3",
    "react": "16.3.2",
    "react-dom": "^16.3.2",
    "typescript": "2.4.1",
    "webpack": "2.5.1",
    "webpack-hot-middleware": "2.18.2",


==================================
Helpers from connect sample
  updates to AzureADOptions
install-package microsoft.identity.client -IncludePrerelease
===================================
Open Views\Home\Index.cshtml
  Update div tag tag, adding class attribute:
    <div id="react-app" class="ms-Fabric">Loading...</div>
Open ClientApp\boot.tsx
  remove bootstrap
  add
    import 'office-ui-fabric-react/dist/css/fabric.css';
Open ClientApp\components\Layout.tsx
  replace entire render method:
     public render() {
      return <div className='ms-Grid'>
        <div className='ms-Grid-row'>
          <div className='ms-Grid-col ms-sm3'>
            <NavMenu />
          </div>
          <div className='ms-Grid-col ms-sm9'>
            {this.props.children}
          </div>
        </div>
      </div>;
    }

Open ClientApp\components\Counter.tsx
  replace constructor:
    constructor(props: RouteComponentProps<{}>) {
        super(props);
        this.state = { currentCount: 0 };
    }

Open ClientApp\components\FetchData.tsx
  replace constructor:
    constructor(props: RouteComponentProps<{}>) {
    super(props);
        this.state = { forecasts: [], loading: true };

        fetch('api/SampleData/WeatherForecasts')
            .then(response => response.json() as Promise<WeatherForecast[]>)
            .then(data => {
                this.setState({ forecasts: data, loading: false });
            });
    }

Open ClientApp\components\NavMenu.tsx
  remove import of 'react-router-dom'
  Add import of Office UI Fabric:
    import { Nav, INavProps } from 'office-ui-fabric-react/lib/Nav';
  Add constructor:
    constructor(props: INavProps) {
      super(props);
    }
  Replace render method:
    public render() {
      return (
        <Nav
          groups={[{
            links: [
              { name: 'Home', key: 'Home', url: '/' },
              { name: 'Counter', key: 'Counter', url: '/counter' },
              { name: 'Fetch data', key: 'FetchData', url: '/fetchdata' },
            ]
          }]}
        />
      );
    }


Add Microsoft.AspNetCore.Authentication.OpenIdConnect package

AppReg
  GroupManager in SCMVP:
    Tenant Domain: scmvp.net
    Tenant ID: 5b952ff1-536f-430c-86a2-06f37793e021
    App ID: b1c56465-1f5a-4191-87a8-86519583f1da

  GroupsReact in SCMVP
    TenantId: "5b952ff1-536f-430c-86a2-06f37793e021",
    ClientId "c56c4bb4-0737-40b3-a0d3-0f99aeff6056",
    ClientSecret: Ga0p85VenEer7Yx4A6Gk/7M0UXf+wFIzUvT8KOMtw5w=

  GroupsReact2 (apps.dev.microsoft.com using admin@scmvp.net)
    ClientId: a7b38ffc-86e1-4b13-868b-9173b69122bf
    Pwd: tqqVPHWVO893-(sinbS49[}

  GroupsReact3 (apps.dev.microsoft.com using admin@scmvp.net)
    ClientId: 82c6fb97-8b40-4ee9-bef6-021c1b4e4fbc
    Pwd: rlwalWSKBQ4{:anLJ7812;[


npm install --save @uifabric/styling


IDX10205: Issuer validation failed. Issuer: 'https://login.microsoftonline.com/5b952ff1-536f-430c-86a2-06f37793e021/v2.0'. Did not match: validationParameters.ValidIssuer: 'null' or validationParameters.ValidIssuers: 'https://sts.windows.net/5b952ff1-536f-430c-86a2-06f37793e021/, https://sts.windows.net/5b952ff1-536f-430c-86a2-06f37793e021/'.