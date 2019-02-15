import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApolloModule, Apollo } from 'apollo-angular';
import { setContext } from 'apollo-link-context';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
// Apollo

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule
  ]
})
export class GraphQLModuleModule { 
  constructor(
      apollo: Apollo,
      httpLink: HttpLink
    ) {
      const http = httpLink.create({uri: '/graphql'});

      const cache = new InMemoryCache();
  
      const auth = setContext((_, { headers }) => {
        // get the authentication token from local storage if it exists
        const token = localStorage.getItem(environment.JWT_TOKEN_NAME);
        // return the headers to the context so httpLink can read them
        // in this example we assume headers property exists
        // and it is an instance of HttpHeaders
        if (!token) {
          return {};
        } else {
          return {
            headers: headers.append('Authorization', `Bearer ${token}`)
          };
        }
      });
  
      apollo.create({
        link: auth.concat(http),
        // other options like cache
        cache
      });
    }
}
