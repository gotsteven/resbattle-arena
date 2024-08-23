import { honoFactory } from '../factory';

// export async function AIController(request: Request) {
//   const body = await request.json();
//   const prompt = body.prompt || 'Default prompt';

//   const result = await generateText({
//     model,
//     prompt,
//   });

//   return c.json({ result }, 201)
// }

// {
//    "status":"201",
//    "prompt":"konnn"
// }

export const AIController = honoFactory.createApp().post('/', async (c) => {
  const { prompt } = await c.req.json()
  try {
  //     const result = await generateText({
  //   model,
  //   prompt,
  // });
  const result = "ok"

    return c.json({ result })
  } catch (error) {
    console.error('Error creating room:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})
