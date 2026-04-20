Get started with Microsoft Foundry
In this exercise, you’ll create and explore a Microsoft Foundry project.

This exercise should take approximately 30 minutes to complete.

Note: Many components of Microsoft Foundry, including the Microsoft Foundry portal, are subject to continual development. This reflects the fast-moving nature of artificial intelligence technology. Some elements of your user experience may differ from the images and descriptions in this exercise!

Create a Microsoft Foundry project
Microsoft Foundry uses projects to organize models, resources, data, and other assets used to develop an AI solution. Projects are associated with an Azure Microsoft Foundry resource, which provides the cloud services required to support AI app and agent development on Azure.

In a web browser, open Microsoft Foundry at https://ai.azure.com and sign in using your Azure credentials. Close any tips or quick start panes that are opened the first time you sign in, and if necessary use the Foundry logo at the top left to navigate to the home page.

If it is not already enabled, in the tool bar the top of the page, enable the New Foundry option. Then, if prompted, create a new project with a unique name; expanding the Advanced options area to specify the following settings for your project:
Foundry resource: Enter a valid name for your AI Foundry resource.
Subscription: Your Azure subscription
Resource group: Create or select a resource group
Region: Select any of the AI Foundry recommended regions
Select Create. Wait for your project to be created. It may take a few minutes. After creating or selecting a project in the new Foundry portal, it should open in a page similar to the following image:

![Screenshot of the Foundry project home page](asset/6- Exercise-01-foundry-project-home-page.png)

View Azure resources for Microsoft Foundry
Microsoft Foundry projects are based on resources in your Azure subscription. Let’s take a look at those.

On the project home page, in the toolbar at the top left, select your project name. Then in the resulting menu, select View all projects to see all of the projects to which you have access (you may only have one!)

![Screenshot of the All projects page](asset/6- Exercise-02-all-projects-page.png)

Each project has a parent resource, in which services and configuration can be applied to multiple child projects.

Note the name of the parent resource for your project. Then, open a new browser tab and navigate to the Azure portal at https://portal.azure.com and if prompted, sign in using your Azure credentials.
In the Azure portal home page, in the search box at the top of the page, search for your Microsoft Foundry parent resource.

![Screenshot of Azure portal search results](asset/6- Exercise-03-azure-portal-search-results.png)

Select the Foundry resource that matches your parent resource name to open it.
In the page for your Foundry resource, view the Resource Visualizer page to see the relationship between the resource and its child project(s).

![Screenshot of Azure portal resource visualizer](asset/6- Exercise-04-resource-visualizer.png)

Select the child project you created in this resource to open its page in the Azure portal.

![Screenshot of Azure portal Foundry project page](asset/6- Exercise-05-foundry-project-azure-page.png)

While most tasks to develop and manage AI projects can be performed in the Microsoft Foundry portal, it’s important to understand that projects and the services they use are implemented as resources in Microsoft Azure; where they may be subject to enterprise governance and security policies.

Close the browser tab containing the Azure portal and return to the Microsoft Foundry portal. Then use the “back arrow” icon next to the All projects page header to return to the home page for your project.
Explore the Microsoft Foundry portal
The Microsoft Foundry portal is where you create and manage agents and AI services for your applications.

Note: The Microsoft Foundry portal is subject to continual improvement and expansion. The interface shown in this exercise may not match the interface of your portal exactly.

View the Home page for your project.

![Screenshot of the project home page](asset/6- Exercise-06-project-home-page.png)

The project has an API key, Project endpoint, and Azure OpenAI endpoint, which can be used to securely access models, agents, and other assets in the project from client applications.

TIP: You’re going to need the project key and project endpoint later!

View the Discover page.

![Screenshot of the Discover page](asset/6- Exercise-07-discover-page.png)

This page surfaces the latest models and services and enables you to find starting points for AI application development.

View the Build page.

![Screenshot of the Build page](asset/6- Exercise-08-build-page.png)

This page is where you develop AI solutions. Here you can:

View and manage the agents and workflows in your project.
View and manage the models in your project.
Fine-tune base models to respond to queries based on your application’s specific needs.
Add and configure tools that agents can use to perform tasks.
Manage knowledge for your agents based on Foundry IQ data sources in your enterprise.
Connect and manage data indexes for AI agents and generative AI apps.
Create evaluations to compare model performance.
Define and manage guardrails to ensure compliance with responsible AI policies for generative AI content and behavior.
View the Operate page.

![Screenshot of the Operate page](asset/6- Exercise-09-operate-page.png)

On this page, you can operate your AI solution by:

Managing assets like agents, models, and tools in your project.
Manage compliance with security policies.
View and manage quota configuration that defines limits for usage of models and other assets in your project.
Perform admin tasks to manage your projects.
View the Docs page.

![Screenshot of the Docs page](asset/6- Exercise-10-docs-page.png)

This page provides access to Microsoft Foundry documentation.

Get AI assistance
As you would expect in a platform for developing cutting edge AI solutions, Microsoft Foundry provides AI-based assistance.

In the toolbar, use the AI chat icon to open the Ask AI pane.

![Screenshot of Ask AI pane in the Foundry portal](asset/6- Exercise-11-ask-ai-pane.png)

Enter a prompt such as What can I do with Microsoft Foundry? and review the response.

If you have any questions about some of the things you’ve explored so far in this exercise, this is the place to ask them!

Deploy a model
Your Microsoft Foundry resource provides an endpoint in which you can deploy models and use them from applications and agents.

On the Discover page, select the Models tab to view the Microsoft Foundry model catalog.

Microsoft Foundry provides a large collection of models from Microsoft, OpenAI, and other providers, that you can use in your AI apps and agents.

![Screenshot of the AI Foundry model catalog](asset/6- Exercise-12-model-catalog.png)

Search for and select the gpt-4.1-mini model, and view the page for this model, which describes its features and capabilities.

![Screenshot of the gpt-4.1-mini model page](asset/6- Exercise-13-gpt-4-1-mini-model-page.png)

Use the Deploy button to deploy the model using the default settings. Deployment may take a minute or so.

Tip: Model deployments are subject to regional quotas. If you don’t have enough quota to deploy the model in your project’s region, you can use a different model - such as gpt-4.1-nano, or gpt-4o-mini. Alternatively, you can create a new project in a different region.

When the model has been deployed, view the model playground page that is opened, in which you can chat with the model.

![Screenshot of the model playground](asset/6- Exercise-14-model-playground.png)

Ensure your model deployment (which should be named gpt-4.1-mini) is selected in the playground.

Tip: Remember the model deployment name. You’ll need it later.

In the Chat pane, test your model by entering a message like What is AI?

Use your Foundry resource endpoint
Now that you have a Microsoft Foundry resource in Azure, you can use its models and tools from client applications. In this exercise, we’ll use a simple AI chat application that has been provided for you.

In the menu at the top of the Foundry portal, select Home to return to the home page.
Note the following details for your project:
Project endpoint: The URL where your project resource can be accessed.

Make sure you use the Project endpoint, and not the Azure OpenAI endpoint!

Project API key: The authentication key used to access your resource*.

You’ll need these values to configure the chat application.

* If you are using a corporate or school Azure subscription that has a policy preventing key-based authentication, you can use Entra ID authentication; but this requires registering the app in your tenant (which requirs global admin permissions). As an option of last-resort, an alternative, browser-based (non-Azure) version of the app is available at https://aka.ms/ask-anton.

Open a second browser tab, and navigate to the Ask Anton (Azure) app at https://aka.ms/azk-anton.

The Ask Anton app should look like this:

![Screenshot of the Ask Anton app](asset/6- Exercise-15-ask-anton-app.png)

In the chat pane header, select Configure, and then enter the project values from the Foundry portal home page and your model deployment name into the Foundry configuration settings page.

![Screenshot of the Ask Anton app configuration page](asset/6- Exercise-16-ask-anton-config-page.png)

Save the configuration.

Note: The configuration values other than the API key will be stored in your local browser. If you close and re-open the app, you will need to re-enter the API key.

Use the app to chat with Anton and ask questions about AI concepts. The app will use your deployed model in Microsoft Foundry.

If you use the speech functionality, the app will use Azure Speech in Foundry tools in your resource to recognize and synthesize speech.

Start with the provided sample prompts, then enter your own questions and requests. The app can provide information on conceptual AI topics as well as Foundry-specific information. For example:

Tell me about Microsoft Foundry.

Can I implement an AI speech solution using Foundry Tools?

Find me an overview of AI app development on Azure.

Note: Some of these prompts will cause the agent to use an MCP tool that connects to the Microsoft Learn documentation site. If you’re not sure what an MCP tool is, ask Anton!

Summary
in this exercise, you explored a Microsoft Foundry project and familiarized yourself with the Microsoft Foundry portal. You then deployed a model and connected a client application to your Foundry resource.

Clean Up
If you have finished exploring Microsoft Foundry, you should delete the resources created in this exercises to avoid unnecessary utilization charges.

Open the Azure portal at https://portal.azure.com and view the contents of the resource group where you deployed the project used in this exercise.
On the toolbar, select Delete resource group.
Enter the resource group name and confirm that you want to delete it.
