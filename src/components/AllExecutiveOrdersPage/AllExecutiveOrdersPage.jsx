import './AllExecutiveOrdersPage.css';
import ExecutiveOrderCard from '../ExecutiveOrderCard/ExecutiveOrderCard'
import MenuPopUp from "../MenuPopUp/MenuPopUp";
// import { data } from 'react-router-dom';

function AllExecutiveOrdersPage({allExecutiveOrders}) {
  console.log("ALL ExecOrders: ", allExecutiveOrders)
  console.log("first ExecOrder: ", allExecutiveOrders)
  console.log("Type of allExecutiveOrders.data:", typeof allExecutiveOrders.data);

  const allExecOrders = allExecutiveOrders.data.map((execOrder) => {
      return (
      <ExecutiveOrderCard
        key={execOrder.id}
        execOrder={execOrder.attributes}
      />
    )
  })

  return (
    <section className="exec-order-page">
      {allExecOrders}
    </section>
  )
}

export default AllExecutiveOrdersPage