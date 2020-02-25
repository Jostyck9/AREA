import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import '../../css/site.css';
import { Button, Form } from 'react-bootstrap'

export default class Creation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: 'nothing'};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChange(event) {
        this.setState({value: event.target.value});
      }
    
      handleSubmit(event) {
        alert(': ' + this.state.value);
        event.preventDefault();
      }
    
      render() {
        return (
            <table width="100%" height="100%" border="0">
                <tr height="100%">
                    <td width="25%"></td>
                    <td width="50%">
                    <div class="text-center">
                    <form onSubmit={this.handleSubmit}>
                        <label>
                        Pick your action:
                        <br></br>
                        <select value={this.state.valueAct} onChange={this.handleChange}>
                            <option value="twitter">Twitter</option>
                            <option value="github">Github</option>
                            <option value="discord">Discord</option>
                            <option value="onedrive">Onedrive</option>
                            <option value="trello">Trello</option>
                            <option value="outlook">Outlook</option>
                            <option value="spotify">Spotify</option>
                        </select>
                        </label>

                        <br></br>
                        <label>
                        Pick your reaction:
                        <br></br>
                        <select value={this.state.value} onChange={this.handleChange}>
                            <option value="twitter">Twitter</option>
                            <option value="github">Github</option>
                            <option value="discord">Discord</option>
                            <option value="onedrive">Onedrive</option>
                            <option value="trello">Trello</option>
                            <option value="outlook">Outlook</option>
                            <option value="spotify">Spotify</option>
                        </select>
                        </label>
                        <br></br>
                        <input type="submit" value="Submit" />
                    </form>
                    </div>
                    </td>
                    <td width="25%"></td>
                    </tr>
            </table>
        );
    }
}