import {
  isDefined,
  Modules,
  TransactionHandlerType,
} from "@arcangel/framework/utils"
import { StepResponse } from "@arcangel/framework/workflows-sdk"
import {
  AuthenticatedArcangelRequest,
  ArcangelResponse,
} from "@arcangel/framework/http"

import { HttpTypes, IWorkflowEngineService } from "@arcangel/framework/types"

export const POST = async (
  req: AuthenticatedArcangelRequest<HttpTypes.AdminCreateWorkflowsAsyncResponse>,
  res: ArcangelResponse<{ success: boolean }>
) => {
  const workflowEngineService: IWorkflowEngineService = req.scope.resolve(
    Modules.WORKFLOW_ENGINE
  )

  const { workflow_id } = req.params

  const body = req.validatedBody

  const { transaction_id, step_id } = body

  const compensateInput = body.compensate_input
  const stepResponse = isDefined(body.response)
    ? new StepResponse(body.response, compensateInput)
    : undefined
  const stepAction = body.action || TransactionHandlerType.INVOKE

  await workflowEngineService.setStepFailure({
    idempotencyKey: {
      action: stepAction,
      transactionId: transaction_id,
      stepId: step_id,
      workflowId: workflow_id,
    },
    stepResponse,
    options: {
      container: req.scope,
      context: {
        requestId: req.requestId,
      },
      throwOnError: false,
      logOnError: true,
    },
  })

  return res.status(200).json({ success: true })
}
