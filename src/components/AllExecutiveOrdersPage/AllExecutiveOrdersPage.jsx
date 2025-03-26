import './AllExecutiveOrdersPage.css';
import ExecutiveOrderCard from '../ExecutiveOrderCard/ExecutiveOrderCard'

function AllExecutiveOrdersPage({allExecutiveOrders, setDetailsTarget, getDetails, handleSavedEos}) {

  if (!allExecutiveOrders?.data || !Array.isArray(allExecutiveOrders.data)) {
    return <p> Loading... </p>
  }

  const allExecOrders = allExecutiveOrders.data.map((execOrder) => {
      return (
      <ExecutiveOrderCard
        key={execOrder.id}
        execOrder={execOrder.attributes}
        setDetailsTarget={setDetailsTarget}
        getDetails={getDetails}
        handleSavedEos={handleSavedEos}
      />
    );
  })

  return (
    <section className="exec-order-page">
      {allExecOrders}
    </section>
  )
}

export default AllExecutiveOrdersPage