import React from 'react';
import { BrowserRouter as Router, Route,Switch , Redirect , Link} from "react-router-dom";
import Department from './components/departments/department';
import Groups from './components/groups/groups';
import CreateNewGroup from './components/groups/createGroup';
import EachGroup from './components/groups/displayGroup'
import EditGroup from './components/groups/editGroup';

import AddDepartment from '../src/components/departments/addDepartment';
import DepartmentDetails from '../src/components/departments/departmentDetails'
import EditDepartment from '../src/components/departments/editDepartment';
import Employee from './components/employee/employee';
import EmployeeDetails from './components/employee/employeeDetails';
import AddEmployee from './components/employee/addEmployee';
import EditEmployeeDetails from './components/employee/editEmployee';
const Index = () => (
  <div>
  <h2> Home </h2>
  </div>
)

const AppRouter = () => (
  <Router>
    <div>
      <nav>
        <ul>
          <li>
          <Link to="/"> Home </Link>
          </li>
          <li>
          <Link to="/departments"> Departments </Link>
          </li><li>
          <Link to="/groups"> Groups </Link>
          </li><li>
          <Link to="/employees/"> Employee </Link>
          </li>
        </ul>
      </nav>
      <Route path="/" exact component={Index} />
      <Route path="/departments/" component={Department} exact />
      <Route path="/employees/" component= {Employee} exact/>
      <Switch>
      <Route path="/groups/" component={Groups} exact />
      <Route path={`/groups/edit/:id`} component={EditGroup} exact/>
      <Route path={`/groups/:id/`} component={EachGroup} exact/>
      <Route path="/employees/new/" component= {AddEmployee} exact/>
      <Route path="/employees/edit/:id" component= {EditEmployeeDetails} exact/>
        <Route path="/departments/new" component={AddDepartment} exact/>
        <Route path="/departments/:id" component={DepartmentDetails}  exact/> 
        <Route path="/departments/edit/:id" component={EditDepartment}  exact/>  
        <Route path="/employees/:id" component={EmployeeDetails}  exact/>
        <Route path="/groups/new/create" component={CreateNewGroup} exact/>

      </Switch>
    </div>
  </Router>
)

export default AppRouter;