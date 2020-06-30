import * as React from 'react';

import './assets/sass/App.sass';
import { Dashboard } from './components/Dashboard/Dashboard';

export class App extends React.Component<{}, undefined> {
  public render() {
    return (
      <div className="app">
        <Dashboard />
      </div>
    );
  }
}
