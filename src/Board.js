import React, {useState, useEffect, useRef} from 'react';
import 'dragula/dist/dragula.css';
import Dragula from 'react-dragula';
import Swimlane from './Swimlane';
import './Board.css';

const Board = () => {

  const getClients = () => {
    return [
      ['1','Stark, White and Abbott','Cloned Optimal Architecture', 'in-progress'],
      ['2','Wiza LLC','Exclusive Bandwidth-Monitored Implementation', 'complete'],
      ['3','Nolan LLC','Vision-Oriented 4Thgeneration Graphicaluserinterface', 'backlog'],
      ['4','Thompson PLC','Streamlined Regional Knowledgeuser', 'in-progress'],
      ['5','Walker-Williamson','Team-Oriented 6Thgeneration Matrix', 'in-progress'],
      ['6','Boehm and Sons','Automated Systematic Paradigm', 'backlog'],
      ['7','Runolfsson, Hegmann and Block','Integrated Transitional Strategy', 'backlog'],
      ['8','Schumm-Labadie','Operative Heuristic Challenge', 'backlog'],
      ['9','Kohler Group','Re-Contextualized Multi-Tasking Attitude', 'backlog'],
      ['10','Romaguera Inc','Managed Foreground Toolset', 'backlog'],
      ['11','Reilly-King','Future-Proofed Interactive Toolset', 'complete'],
      ['12','Emard, Champlin and Runolfsdottir','Devolved Needs-Based Capability', 'backlog'],
      ['13','Fritsch, Cronin and Wolff','Open-Source 3Rdgeneration Website', 'complete'],
      ['14','Borer LLC','Profit-Focused Incremental Orchestration', 'backlog'],
      ['15','Emmerich-Ankunding','User-Centric Stable Extranet', 'in-progress'],
      ['16','Willms-Abbott','Progressive Bandwidth-Monitored Access', 'in-progress'],
      ['17','Brekke PLC','Intuitive User-Facing Customerloyalty', 'complete'],
      ['18','Bins, Toy and Klocko','Integrated Assymetric Software', 'backlog'],
      ['19','Hodkiewicz-Hayes','Programmable Systematic Securedline', 'backlog'],
      ['20','Murphy, Lang and Ferry','Organized Explicit Access', 'backlog'],
    ].map(companyDetails => ({
      id: companyDetails[0],
      name: companyDetails[1],
      description: companyDetails[2],
      status: companyDetails[3],
    }));
  }
  
    const clients = getClients();
    const [backlog, setBacklog] = useState(clients.filter(client => !client.status || client.status === 'backlog'))
    const [inProgress, setInProgress] = useState(clients.filter(client => client.status && client.status === 'in-progress'))
    const [complete, setComplete] = useState(clients.filter(client => client.status && client.status === 'complete'))
     
    const backlogRef = useRef()
    const inProgressRef = useRef()
    const completeRef = useRef()
  
    
  const renderSwimlane = (name, clients, ref) => {
    return (
      <Swimlane name={name} clients={clients} dragulaRef={ref}/>
    );
  }
  
  useEffect(() => {

    const containers = [backlogRef.current, inProgressRef.current, completeRef.current]
    const drake = Dragula(containers, {})

    
    drake.on('drop', (el, target, source, sibling) => {
      drake.cancel(true); 


      let targetSwimlane = ""
      if(target === inProgressRef.current)
        targetSwimlane = 'in-progress'
      else if(target === completeRef.current)
        targetSwimlane = 'complete'
      else
        targetSwimlane = 'backlog'

  
      const clientsList = [
        ...backlog, ...inProgress, ...complete
      ]

      const movedClient = clientsList.find(c=> c.id === el.dataset.id)
      const movedClientClone = {
        ...movedClient,
        status: targetSwimlane
      }
      console.log(movedClientClone)
      let updatedClientsList = clientsList.filter(c=>c.id !== movedClientClone.id)
      const sibIdx = updatedClientsList.findIndex(c=> sibling && c.id === sibling.dataset.id)
      sibIdx = sibIdx === -1 ? updatedClientsList.legnth : sibIdx
      updatedClientsList = [...updatedClientsList.slice(0, sibIdx), movedClientClone, ...updatedClientsList.slice(sibIdx)]

      console.log(updatedClientsList)
      setInProgress(updatedClientsList.filter(c => c.status && c.status === 'in-progress'))
      setComplete(updatedClientsList.filter(c => c.status && c.status === 'complete'))
      setBacklog(updatedClientsList.filter(c => c.status && c.status === 'backlog'))
    })
      
  }, [backlog, inProgress, complete])

  


    return (
      <div className="Board">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-4">
              {renderSwimlane('Backlog', backlog, backlogRef)}
            </div>
            <div className="col-md-4">
              {renderSwimlane('In Progress', inProgress, inProgressRef)}
            </div>
            <div className="col-md-4">
              {renderSwimlane('Complete', complete, completeRef)}
            </div>
          </div>
        </div>
      </div>
    );
  
}
export default Board
