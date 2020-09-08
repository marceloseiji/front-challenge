# FrontChallenge

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.8.

## Existe um deploy já feito deste projeto no link:
   https://marceloseiji.github.io/front-challenge/


## Deploy to github pages

1) Faça o download do projeto e abra-o em sua ide.
2) Em uma conta do github crie um repositório para o projeto.
3) Faça o build do projeto com o nome escolhido no repositório criado no github, use o seguinte comando:

   ng build --prod --output-path docs --base-href /<project_name>/

4) Quando o build estiver completo a pasta dos será criada. Nesta pasta faça uma cópia do arquivo index.html e renomeie para docs/404.html
5) Faça o commit das alterações e faça o push para o repositório que foi criado.
6) Na página do projeto do github vá nas configurações do repositório, na seção github pages configure a source para a branch em que a pasta docs
   foi adicionada. Em seguida no dropdown ao lado selecione a pasta /docs. Vocẽ pode seguir este link também:

   https://docs.github.com/en/github/working-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site#publishing-your-github-pages-site-from-a-docs-folder-on-your-master-branch


7) Salve as alterações.
8) Dentro de algum tempo o projeto poderá ser visualizado no seguinte link. Substitua o nome do usuário e o nome do projeto no link.
   
   https://<user_name>.github.io/<project_name>/


