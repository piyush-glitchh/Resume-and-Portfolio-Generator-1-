import { supabaseAdmin } from "@/lib/supabase"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required data
    if (!body.data || !body.template || !body.customization) {
      return NextResponse.json({ error: "Missing required portfolio data" }, { status: 400 })
    }

    // Generate unique ID
    const portfolioId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    // Insert into Supabase
    const { data, error } = await supabaseAdmin
      .from("portfolios")
      .insert({
        id: portfolioId,
        data: body.data,
        template: body.template,
        customization: body.customization,
        created_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) {
      console.error("Supabase insert error:", error)
      return NextResponse.json({ error: "Failed to save portfolio" }, { status: 500 })
    }

    return NextResponse.json({ id: portfolioId })
  } catch (error) {
    console.error("Portfolio creation error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "Portfolio ID is required" }, { status: 400 })
    }

    // Fetch from Supabase
    const { data, error } = await supabaseAdmin.from("portfolios").select("*").eq("id", id).single()

    if (error || !data) {
      return NextResponse.json({ error: "Portfolio not found" }, { status: 404 })
    }

    return NextResponse.json({
      id: data.id,
      data: data.data,
      template: data.template,
      customization: data.customization,
      created_at: data.created_at,
    })
  } catch (error) {
    console.error("Portfolio fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
