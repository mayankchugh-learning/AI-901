# Get started with information extraction in Microsoft Foundry

Azure Content Understanding provides multi-modal analysis of documents, audio files, video, and images to extract information.

In this exercise, you'll use Azure Content Understanding in Foundry, Microsoft's platform for creating intelligent applications, to extract information from invoices. Then you'll try using Azure Content Understanding with the REST API.

*This exercise should take approximately 25 minutes to complete.*

*Training PDF (browser export):* [4- Get started with information extraction in Microsoft Foundry _ Get started with AI apps and agents in Azure.pdf](./4- Get started with information extraction in Microsoft Foundry _ Get started with AI apps and agents in Azure.pdf)

> **Note**
> This exercise uses the classic Foundry portal experience. If you are using the new Foundry portal, toggle back to classic.

## Create a Microsoft Foundry project for Content Understanding

1. In a web browser, open Microsoft Foundry at [https://ai.azure.com](https://ai.azure.com) and sign in using your Azure credentials. Close any tips or quick-start panes, and if necessary use the Foundry logo at the top left to navigate to the home page (close the Help pane if it's open).
2. Ensure the **New Foundry** option is not selected.

![Foundry home page (classic) before selecting AI services.](C:/Users/madfa/.cursor/projects/c-githunb-AI-901-Prep/assets/c__Users_madfa_AppData_Roaming_Cursor_User_workspaceStorage_55127c6d93390f5ff807c51144805422_images_image-78a5c96e-952d-4cee-98fb-d86942634216.png)

3. Scroll to the bottom of the page and select the **Explore Azure AI Services** tile.

![Explore Azure AI Services tile on the Foundry home page.](C:/Users/madfa/.cursor/projects/c-githunb-AI-901-Prep/assets/c__Users_madfa_AppData_Roaming_Cursor_User_workspaceStorage_55127c6d93390f5ff807c51144805422_images_image-e02f9e6b-c496-4303-a94b-557b9b8efbc1.png)

4. On the **Azure AI Services** page, select **Try Content Understanding**.

![Azure AI Services page with Try Content Understanding highlighted.](C:/Users/madfa/.cursor/projects/c-githunb-AI-901-Prep/assets/c__Users_madfa_AppData_Roaming_Cursor_User_workspaceStorage_55127c6d93390f5ff807c51144805422_images_image-3eb82ffd-2244-40e5-90af-f73af0e63e8e.png)

5. On the Content Understanding page, select **Create project to start**. In the **Create project** dialog, select the recommended resource type (**Microsoft Foundry resource**) and then select **Next**.

![Create project dialog with Microsoft Foundry resource selected.](C:/Users/madfa/.cursor/projects/c-githunb-AI-901-Prep/assets/c__Users_madfa_AppData_Roaming_Cursor_User_workspaceStorage_55127c6d93390f5ff807c51144805422_images_image-12a4792c-7196-4b7d-9b3f-f0cbe8ed67ef.png)

6. On the next page, enter a valid project name. Expand **Advanced options** and specify:
   - **Foundry resource:** A valid name for your Foundry resource
   - **Subscription:** Your Azure subscription
   - **Resource group:** Create or select a resource group
   - **Region:** Select one of the following locations:
     - West US
     - Sweden Central
     - Australia East

   At the time of writing, Content Understanding is supported in these regions.

![Project settings and advanced options for Foundry resource creation.](C:/Users/madfa/.cursor/projects/c-githunb-AI-901-Prep/assets/c__Users_madfa_AppData_Roaming_Cursor_User_workspaceStorage_55127c6d93390f5ff807c51144805422_images_image-c622a022-b8cf-4800-9d31-d9dba9997523.png)

7. Select **Create** and wait for setup to complete. It may take a few minutes.

## Extract information from an invoice in Foundry portal (classic)

1. On the Content Understanding page, select the **Try it out** tab, then select the **Invoice Data Extraction** tile.

A sample invoice is provided.

![Try it out page with Invoice Data Extraction selected and sample invoice loaded.](C:/Users/madfa/.cursor/projects/c-githunb-AI-901-Prep/assets/c__Users_madfa_AppData_Roaming_Cursor_User_workspaceStorage_55127c6d93390f5ff807c51144805422_images_image-ca217313-5d65-4f82-9d2a-d1d11c59319a.png)

2. Select the sample invoice and use **Run analysis** to extract information. When analysis completes, review the results.

![Sample invoice analysis results with extracted fields.](C:/Users/madfa/.cursor/projects/c-githunb-AI-901-Prep/assets/c__Users_madfa_AppData_Roaming_Cursor_User_workspaceStorage_55127c6d93390f5ff807c51144805422_images_image-62b39f40-64c6-4fb7-acb7-4dcb2282c3a1.png)

3. Download `contoso-invoice-1.pdf` from [https://raw.githubusercontent.com/MicrosoftLearning/mslearn-ai-fundamentals/refs/heads/main/data/content-understanding/contoso-invoice-1.pdf](https://raw.githubusercontent.com/MicrosoftLearning/mslearn-ai-fundamentals/refs/heads/main/data/content-understanding/contoso-invoice-1.pdf).
4. In Foundry, use **Browse for files** to upload `contoso-invoice-1.pdf`, then run analysis on that file.

![Analysis results for uploaded contoso-invoice-1.pdf.](C:/Users/madfa/.cursor/projects/c-githunb-AI-901-Prep/assets/c__Users_madfa_AppData_Roaming_Cursor_User_workspaceStorage_55127c6d93390f5ff807c51144805422_images_image-c48e777a-76ce-49af-8917-77a5ac98501d.png)

Note that the Content Understanding analyzer can extract information from this invoice even though it is formatted differently from the sample.

5. In the right pane where extracted fields are displayed, select the **Result** tab to view the JSON response that would be sent to a client application. A developer would write code to process this response and use the extracted fields.

![Result tab showing JSON response for analyzed invoice.](C:/Users/madfa/.cursor/projects/c-githunb-AI-901-Prep/assets/c__Users_madfa_AppData_Roaming_Cursor_User_workspaceStorage_55127c6d93390f5ff807c51144805422_images_image-a355c33f-5c04-4c53-b537-8aabc324b483.png)

Developers can use the REST API to build an app that submits a document for analysis using a `POST` operation. For example, the following `curl` command can analyze an invoice:

```bash
curl -i -X POST "{endpoint}/contentunderstanding/analyzers/{analyzerId}:analyze?api-version=2025-11-01" \
  -H "Ocp-Apim-Subscription-Key: {key}" \
  -H "Content-Type: application/json" \
  -d '{
        "inputs":[
          {
            "url": "https://{url_path}/invoice.png"
          }
        ]
      }'
```

The analysis is asynchronous, so the response includes an `id` value that can be used to poll for results:

```json
{
  "id": "{resultId}",
  "status": "Running",
  "result": {
    "analyzerId": "{analyzerId}",
    "apiVersion": "2025-11-01",
    "createdAt": "YYYY-MM-DDTHH:MM:SSZ",
    "warnings": [],
    "contents": []
  }
}
```

To retrieve results using the ID, the client submits a `GET` request:

```bash
curl -i -X GET "{endpoint}/contentunderstanding/analyzerResults/{resultId}?api-version=2025-11-01" \
  -H "Ocp-Apim-Subscription-Key: {key}"
```

## Clean up

If you've finished working with the Content Understanding service, delete the resources you created in this exercise to avoid unnecessary Azure costs.

In the Azure portal, delete the resource group you created in this exercise.
Get started with information extraction in Microsoft Foundry
Azure Content Understanding provides multi-modal analysis of documents, audio files, video, and images to extract information.

In this exercise, you will use Azure Content Understanding in Foundry, Microsoft’s platform for creating intelligent applications, to extract information from invoices. Then you will try out using Azure Content Understanding in Foundry Tools with the REST API.

This exercise takes approximately 25 minutes.

Note: This exercise utilizes the classic Foundry portal experience. If you are using the new Foundry portal, you need to toggle back to classic.

Create a Microsoft Foundry project for content understanding
In a web browser, open Microsoft Foundry at https://ai.azure.com and sign in using your Azure credentials. Close any tips or quick start panes that are opened the first time you sign in, and if necessary use the Foundry logo at the top left to navigate to the home page, which looks similar to the following image (close the Help pane if it’s open).

Ensure the New Foundry option is not selected.

Screenshot of Foundry home page.

Scroll to the bottom of the page, and select the Explore Azure AI Services tile.

Screenshot of the Explore Azure AI Services tile.

On the Azure AI Services page, select Try Content Understanding.

Screenshot of the Try COntent Understanding button.

In the Content Understanding page, select Create a project to start. Then in the Create project dialog, select the recommended resource type (Foundry resource):

Screenshot of analysis results.

On the Next page, enter a valid name for your project. Then Select Advanced options and specify the following settings:
Foundry resource: A valid name for your Foundry resource
Subscription: Your Azure subscription
Resource group: Create or select a resource group
Region: Select one of the following locations*:
West US
Sweden Central
Australia East
*At the time of writing, Content Understanding is supported in these regions.

Screenshot of project settings.

Select Create. Wait for the set up process to complete. It may take a few minutes.
Extract information from an invoice in Foundry portal (classic)
On the Content Understanding page, select the Try it out tab, and then select the Invoice Data Extraction tile.

Screenshot of the Content Understanding "Try it out" page.

A sample invoice is provided.

Select the sample invoice and use the Run analysis button to extract information from it. When analysis is complete, view the results.

Screenshot of the results of analysing the sample invoice.

Download contoso-invoice-1.pdf from https://raw.githubusercontent.com/MicrosoftLearning/mslearn-ai-fundamentals/refs/heads/main/data/content-understanding/contoso-invoice-1.pdf.

In Foundry, use the Browse for files link to upload the contoso-invoice-1.pdf document you downloaded previously, and run analysis on that file.

Screenshot of the results of analysing the Contoso invoice.

Note that the Content Understanding analyzer is able to extract information from this invoice, even though it is formatted diffferently from the sample.

In the pane on the right where the extracted fields are displayed, view the Result tab to see the JSON response that would be sent to a client application. A developer would write code to process this response and utilize the extracted fields.

Screenshot of the results of analysing the Contoso invoice.

Developers can use the REST API to build an app that submits a document for analysis using a POST operation. For example, the following cUrl command could be used to analyze an invoice:

code
curl -i -X POST "{endpoint}/contentunderstanding/analyzers/{analyzerId}:analyze?api-version=2025-11-01" \
   -H "Ocp-Apim-Subscription-Key: {key}" \
   -H "Content-Type: application/json" \
   -d '{
         "inputs":[
           {
             "url": "https://{url_path}/invoice.png"
           }          
         ]
       }'
The analysis is performed asynchronously, so the response includes an id value that can be used to poll for the results:

code
{
   "id": {resultId},
   "status": "Running",
   "result": {
     "analyzerId": {analyzerId},
     "apiVersion": "2025-11-01",
     "createdAt": "YYYY-MM-DDTHH:MM:SSZ",
     "warnings": [],
     "contents": []
   }
 }
To retrieve the results using the ID, the client must submit a GET request:

code
curl -i -X GET "{endpoint}/contentunderstanding/analyzerResults/{resultId}?api-version=2025-11-01" \
   -H "Ocp-Apim-Subscription-Key: {key}"
Clean up
If you’ve finished working with the Content Understanding service, you should delete the resources you have created in this exercise to avoid incurring unnecessary Azure costs.

In the Azure portal, delete the resource group you created in this exercise.