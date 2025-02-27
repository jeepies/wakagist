<h1 style="text-align: center;">WakaGist</h1>

<p align="center">
  <img width="400" src="https://raw.githubusercontent.com/jeepies/wakagist/refs/heads/main/preview.png">
  <p align="center">Update a pinned gist to contain an overview of your WakTime stats</p>
</p>

## Setup

1. Fork the repository
2. Create a **public** Gist [here](https://gist.github.com/) - The content or title does not matter
3. Setup the repository secrets
   - Repository secrets should be created on the repository page, in `Settings >> Security >> Secrets and Variables >> Actions` (https://github.com/[USERNAME]/wakagist/settings/secrets/actions)
   1. `GIST_ID`
      1. Copy the identifier from the Gist you created
         - The identifier will be the end of the url - e.g. for [this](https://gist.github.com/jeepies/e975b19012d1b268884a5bb7354a19b3) gist, the identifier is `e975b19012d1b268884a5bb7354a19b3`
      2. Create a new repository secret called `GIST_ID`, where the secret content is the previously copied identifier
   2. `GH_PAT`
      1. Generate a new Personal Access Token [here](https://github.com/settings/personal-access-tokens/new). Once you generate a token, you will not be able to see it again - Ensure you have copied it after clicking the `Generate` button.
         - You can name this token whatever you want, but it'd be best to name it something such as `WakaGist`.
         - The expiration can be set to any value, but I recommend `90 days`
         - Repository Access should be set to `All repositories`
         - Under `Account permissions`, find the `Gist` permission and set it to `Access: Read and write`
      2. Create a new repository secret called `GH_PAT`, where the secret content is the access token
   3. `WAKATIME_KEY`
      1. If you have not yet, create an account on [WakaTime](https://wakatime.com)
      2. Visit [this](https://wakatime.com/settings/api-key) page and copy the API key
      3. Create a new repository secret called `WAKATIME_KEY`, where the secret content is the API key
4. Run the action for the first time
5. Ensure the Gist has updated
