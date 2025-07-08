local Debug = ESX.GetConfig().EnableDebug

---@param message any the message :D
---@param notifyType string the notification type
---@param length number the length of the notification
local function Notify(message, notifyType, length)
    if Debug then
        print("1 ".. tostring(message))
        print("2 "..tostring(notifyType))
        print("3 "..tostring(length))
    end

    if type(notifyType) ~= "string" then
        notifyType = "info"
    end

    if type(length) ~= "number" then
        length = 3000
    end

    if Debug then
        print("4 ".. tostring(message))
        print("5 "..tostring(notifyType))
        print("6 "..tostring(length))
    end

    SendNuiMessage(json.encode({
        type = notifyType or "info",
        length = length or 3000,
        message = message or "ESX-Notify"
    }))
end

exports('Notify', Notify)
RegisterNetEvent("ESX:Notify", Notify)

if Debug then
    RegisterCommand("oldnotify", function()
        ESX.ShowNotification('No Waypoint Set.', true, false, 140)
    end)

    RegisterCommand("notify", function()
        ESX.ShowNotification("You Recived ~br~ 1x ball~s~!", "success", 3000)
    end)

    RegisterCommand("notify1", function()
        ESX.ShowNotification("Well ~g~Done~s~!", "success", 3000)
    end)

    RegisterCommand("notify2", function()
        ESX.ShowNotification("Information Recived", "info", 3000)
    end)

    RegisterCommand("notify3", function()
        ESX.ShowNotification("You Did something ~r~WRONG~s~!", "error", 3000)
    end)
end