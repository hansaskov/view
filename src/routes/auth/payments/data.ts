export type Payment = {
	id: string
	amount: number
	status: "pending" | "processing" | "success" | "failed"
	email: string
}

export const payments: Payment[] = [
	{
		id: "728ed52f",
		amount: 100,
		status: "pending",
		email: "m@example.com",
	},
	{
		id: "489e1d42",
		amount: 125,
		status: "processing",
		email: "example@gmail.com",
	},
	{
		id: "a1b2c3d4",
		amount: 50,
		status: "success",
		email: "user1@test.org",
	},
	{
		id: "e5f6g7h8",
		amount: 200,
		status: "failed",
		email: "user2@domain.net",
	},
	{
		id: "i9j0k1l2",
		amount: 75,
		status: "pending",
		email: "test3@service.co",
	},
	{
		id: "m3n4o5p6",
		amount: 150,
		status: "processing",
		email: "info4@another.com",
	},
	{
		id: "q7r8s9t0",
		amount: 300,
		status: "success",
		email: "payment5@email.io",
	},
	{
		id: "u1v2w3x4",
		amount: 80,
		status: "failed",
		email: "error6@web.dev",
	},
	{
		id: "y5z6a7b8",
		amount: 90,
		status: "pending",
		email: "customer7@domain.me",
	},
	{
		id: "c9d0e1f2",
		amount: 175,
		status: "processing",
		email: "client8@mail.biz",
	},
	{
		id: "g3h4i5j6",
		amount: 250,
		status: "success",
		email: "order9@email.app",
	},
	{
		id: "k7l8m9n0",
		amount: 60,
		status: "failed",
		email: "refund10@service.net",
	},
	{
		id: "o1p2q3r4",
		amount: 110,
		status: "pending",
		email: "invoice11@example.org",
	},
	{
		id: "s5t6u7v8",
		amount: 130,
		status: "processing",
		email: "transaction12@gmail.com",
	},
	{
		id: "w9x0y1z2",
		amount: 350,
		status: "success",
		email: "purchase13@domain.com",
	},
	{
		id: "a3b4c5d6",
		amount: 40,
		status: "failed",
		email: "declined14@test.com",
	},
	{
		id: "e7f8g9h0",
		amount: 190,
		status: "pending",
		email: "hold15@example.net",
	},
	{
		id: "i1j2k3l4",
		amount: 160,
		status: "processing",
		email: "inprocess16@mail.org",
	},
	{
		id: "m5n6o7p8",
		amount: 220,
		status: "success",
		email: "paid17@service.com",
	},
	{
		id: "q9r0s1t2",
		amount: 70,
		status: "failed",
		email: "issue18@web.com",
	},
]
