import { getAllUsers } from "@/actions/users"
import { CustomersTable } from "@/components/admin/customers-table"

export default async function CustomersPage() {
  const users = await getAllUsers()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Customers</h1>
        <p className="text-muted-foreground">View and manage your customers</p>
      </div>

      <CustomersTable users={users} />
    </div>
  )
}
