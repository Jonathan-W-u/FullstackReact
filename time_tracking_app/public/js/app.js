/*
 * @Description: 
 * @version: 
 * @Author: jonathanWu
 * @Date: 2023-03-16 11:14:51
 * @LastEditors: jonathanWu
 * @LastEditTime: 2023-03-22 21:55:58
 */
class TimersDashboard extends React.Component{
    state ={
        timers:[
            {
                title:'Practice squat',
                project:'Gym Chores',
                id:uuid.v4(),
                elapsed:5456099,
                runningSince:Date.now(),
            },
            {
                title:'Bake squash',
                project:'Kitchen Chores',
                id:uuid.v4(),
                elapsed:1273998,
                runningSince:null,
            },
        ],
    }

    handleCreateFormSubmit = (timer) => {
        const t = helpers.newTimer(timer);
        this.setState({
            timers:this.state.timers.concat(t)
        })
    }

    render(){
        console.log('正常！');
        return(
            <div className='ui three column centered grid'>
                <div className='column'>
                    <EditableTimerList
                        timers={this.state.timers}
                    />
                    <ToggleableTimerForm
                        onFormSubmit = {this.handleCreateFormSubmit}
                    />
                </div>
            </div>
        );
    }
}

class EditableTimerList extends React.Component{
    render(){
        const timers=this.props.timers.map((timer)=>(
            <EditableTimer
                key={timer.id}
                id={timer.id}
                title={timer.title}
                project={timer.project}
                elapsed={timer.elapsed}
                runningSince={timer.runningSince}
            />
        ));
        return(
            <div id='timers'>
                {timers}
            </div>
        );
        /* return(
            <div id='timers'>
                <EditableTimer
                    title='Learn React'
                    project='Web Domination'
                    elapsed='8986300'
                    runningSince={null}
                    editFormOpne={false}
                />
                <EditableTimer
                    title='Learn extreme ironing'
                    project='World Domination'
                    elapsed='3890985'
                    runningSince={null}
                    editFormOpne={true}
                />
            </div>
        ); */
    }
}

class EditableTimer extends React.Component{
    state={
        editFormOpen:false,
    };
    render(){
        if(this.state.editFormOpen){
            return(
                <TimerForm
                    id={this.props.id}
                    title={this.props.title}
                    project={this.props.project}
                />
            );
        }else{
            return(
                <Timer
                    id={this.props.id}
                    title={this.props.title}
                    project={this.props.project}
                    elapsed={this.props.elapsed}
                    runningSince={this.props.runningSince}
                />
            );
        }
    }
}

class TimerForm extends React.Component{
    state = {
        title:this.props.title || '',
        project:this.props.project || '',
    };

    handleTitleChange = (e)=>{
        this.setState({title:e.target.value})
        console.log(e)
    };

    handleProjectChange = (e)=>{
        this.setState({project:e.target.value})
    };

    handleSubmit = ()=>{
        this.props.onFormSubmit({
            id: this.props.id,
            title:this.state.title,
            project:this.state.project,
        });
    }

    render(){
        const submitText = this.props.id ? 'Update' : 'create';
        return(
            <div className='ui centered card'>
                <div className='content'>
                    <div className='ui form'>
                        <div className='field'>
                            <label>Title</label>
                            <input 
                                type='text' 
                                defaultValue={this.state.title} 
                                onChange={this.handleTitleChange}
                            />
                        </div>
                        <div className='field'>
                            <label>Project</label>
                            <input 
                                type='text' 
                                defaultValue={this.state.project}
                                onChange={this.handleProjectChange}
                            />
                        </div>
                        <div className='ui two bottom attached buttons'>
                            <button 
                                className='ui basic blue button'
                                onClick = {this.handleSubmit}
                            >
                                {submitText}
                            </button>
                            <button 
                                className='ui basic red button'
                                onClick = {this.props.onFormClose}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class ToggleableTimerForm extends React.Component{
    state ={
        isOpen:false,
    };

    handleFormOpen=()=>{
        this.setState({isOpen:true});
    };

    handleFormClose = ()=>{
        this.setState({isOpen:false});
    };

    handleFormSubmit = (timer) =>{
        this.props.onFormSubmit(timer);
        this.setState({isOpen:false});
    };



    render(){
        if (this.state.isOpen){
            return(
                <TimerForm
                    onFormSubmit = {this.handleFormSubmit}
                    onFormClose = {this.handleFormClose}
                />
            );
        }else{
            return(
            <div className='ui basic content center aligned segment'>
                <button 
                    className='ui basic button icon'
                    onClick={this.handleFormOpen}
                >
                    <i className='plus icon'/>
                </button>
            </div>
            );
        }
    }
}

class Timer extends React.Component{
    render(){
        const elapsedString=helpers.renderElapsedString(this.props.elapsed);
        return(
            <div className='ui centered card'>
                <div className='content'>
                    <div className='header'>
                        {this.props.title}
                    </div>
                    <div className='meta'>
                        {this.props.project}
                    </div>
                    <div className='center aligned description'>
                        <h2>
                            {elapsedString}
                        </h2>
                    </div>
                    <div className='extra content'>
                        <span className='right floated edit icon'>
                            <i className='edit icon'/>
                        </span>
                        <span className='right floated trash icon'>
                            <i className='trash icon'/>
                        </span>
                    </div>
                </div>
                <div className='ui bottom attached blue basic button'>
                    Start
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <TimersDashboard />,
    document.getElementById('content')
);