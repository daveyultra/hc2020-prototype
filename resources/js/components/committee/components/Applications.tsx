import React, { Component } from 'react';
import { Page, Button, Card, ResourceList, Avatar, TextStyle, TextContainer, Heading, Filters } from "@shopify/polaris";
import axios from 'axios';
import { IApplicationSummary } from '../../../interfaces/committee.interfaces';
import { toast } from 'react-toastify';
import md5 from 'md5';

interface IApplicationsProps {

}

interface IApplicationsState {
    isLoading: boolean,
    applications: IApplicationSummary[],
}

class Applications extends Component<IApplicationsProps, IApplicationsState> {

    private dummyRecord : IApplicationSummary = { name:"", email:"", id:0, user_id:0, hasSubmitted:false }
    state = {
        isLoading: true,
        applications: [this.dummyRecord],
    }

    componentDidMount() {
        this.loadApplicationsSummary();
    }

    render() {
        const { isLoading, applications } = this.state;

        const filterControl = (
            <Filters
              queryValue={""}
              filters={[]}
              appliedFilters={[]}
              onQueryChange={() => {}}
              onQueryClear={() => {}}
              onClearAll={() => {}}
            />
          );
          
        return (
            <Page title={"Applications"}>
                <Card>
                    { applications && applications.length > 0 ?
                        <ResourceList
                            loading={isLoading}
                            resourceName={{singular: 'application', plural: 'applications'}}
                            items={applications}
                            renderItem={this.renderApplicationSummaryRow}
                            filterControl={filterControl}
                        />
                    : 
                        <Heading>Loading...</Heading>
                    }
                    </Card>
            </Page>
        );
    }

    private loadApplicationsSummary = () => {
        this.setState({ isLoading: true });
        axios.get(`/committee/admin-api/applications-summary.json`).then(res => {
            const status = res.status;
            if(status == 200) {
                const payload = res.data;
                if("success" in payload && payload["success"]) {
                    const applications: IApplicationSummary[] = payload["applications"];
                    console.log(applications);
                    this.setState({ 
                        applications: applications,
                        isLoading: false,
                    });
                    return;
                }
            }
            toast.error("Failed to load applications.");
            // console.log(status, res.data);
            this.setState({ isLoading: false });
        });
    }

    private renderApplicationSummaryRow = (item : IApplicationSummary) => {
        const media = item.email.length > 0 
            ? <Avatar customer size="medium" source={`https://www.gravatar.com/avatar/${md5(item.email.toLowerCase())}?d=retro`} />
            : <></>;

        const url = `/committee/admin/applications/${item.id}`;
        return (
            <ResourceList.Item
                id={`${item.id}`}
                url={url}
                media={media}
                accessibilityLabel={`View details for ${item.name}`}
                shortcutActions={[{content: 'View application', url: url}]}
            >
                <h3>
                    <TextStyle variation="strong">{item.name}</TextStyle>
                </h3>
                <div>{item.email}</div>
            </ResourceList.Item>
        );
        return <h1></h1>
    }
}

export default Applications;