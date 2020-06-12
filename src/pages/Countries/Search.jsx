import React from "react"

import { Subject } from "rxjs"
import { debounceTime } from 'rxjs/operators';

import TextField from "@material-ui/core/TextField"

export default class Search extends React.Component {

  constructor(props) {
    super(props)
    this.subject = new Subject()
    this.onSearch = this.onSearch.bind(this);
  }

  componentDidMount() {
    this.subscription = this.subject
      .pipe(debounceTime(500))
      .subscribe((debounced) => this.props.handleChange(debounced))
  }

  componentWillUnmount() {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  onSearch(e) {
    const search = e.target.value;
    this.subject.next(search);
  }

  render() {
      return (
        <TextField inputProps={{ "data-testid": "search-input" }} label="search" onChange={this.onSearch} />
      )
  }

}