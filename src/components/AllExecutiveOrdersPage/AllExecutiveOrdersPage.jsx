import './AllExecutiveOrdersPage.css';
import ExecutiveOrderCard from '../ExecutiveOrderCard/ExecutiveOrderCard'
// import { data } from 'react-router-dom';

function AllExecutiveOrdersPage({allExecutiveOrders}) {
  console.log("ALL ExecOrders: ", allExecutiveOrders)
  console.log("first ExecOrder: ", allExecutiveOrders)
  const allExecOrders = allExecutiveOrders.map((execOrder) => {
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