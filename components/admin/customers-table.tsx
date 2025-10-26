import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

type User = {
  id: string
  email: string
  firstName: string | null
  lastName: string | null
  points: number
  createdAt: Date
  _count: {
    orders: number
    wishlistItems: number
    reviews: number
  }
}

export function CustomersTable({ users }: { users: User[] }) {
  return (
    <div className="rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Customer</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Orders</TableHead>
            <TableHead>Points</TableHead>
            <TableHead>Wishlist</TableHead>
            <TableHead>Joined</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">
                {user.firstName} {user.lastName}
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Badge variant="secondary">{user._count.orders} orders</Badge>
              </TableCell>
              <TableCell>
                <Badge className="bg-purple-500/10 text-purple-500 border-purple-500/20">{user.points} pts</Badge>
              </TableCell>
              <TableCell>{user._count.wishlistItems} items</TableCell>
              <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
