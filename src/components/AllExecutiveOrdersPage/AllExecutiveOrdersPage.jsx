import './AllExecutiveOrdersPage.css';
import ExecutiveOrderCard from '../ExecutiveOrderCard/ExecutiveOrderCard'

function AllExecutiveOrdersPage({allExecutiveOrders, setDetailsTarget, getDetails}) {

  const allExecOrders = allExecutiveOrders.data.map((execOrder) => {
      return (
      <ExecutiveOrderCard
        key={execOrder.id}
        execOrder={execOrder.attributes}
        setDetailsTarget={setDetailsTarget}
        getDetails={getDetails}
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