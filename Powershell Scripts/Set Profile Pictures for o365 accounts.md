##### Version 1.0
```
param (
    [switch]$Revert
)

# Import the required module
Install-Module -Name ExchangeOnlineManagement -Force -AllowClobber

# Connect to Exchange Online using your admin credentials
$adminCredential = Get-Credential -Credential 'seanwilson@test.com'
Connect-ExchangeOnline -UserPrincipalName 'seanwilson@test.com' -DelegatedOrganization tenant.onmicrosoft.com -Credential $adminCredential

# Load the CSV file
$csvFile = Import-Csv -Path 'C:\path\to\csv\file.csv'

# Network drive path for photos
$photoPath = "\\192.17.02.01\data\newstarters\photo"

# Pre-load user profile picture availability
$existingPhotos = Get-UserPhoto -ResultSize Unlimited | Select-Object -ExpandProperty Identity | ForEach-Object { $_.Id }

# Loop through each row in the CSV file
foreach ($row in $csvFile) {
    $userEmail = $row.Email
    $optIn = $row.OptIn

    if ($Revert) {
        # Revert changes for users who opted in
        if ($optIn -eq "Yes") {
            try {
                # Check if the user already has a profile picture
                if ($userEmail -in $existingPhotos) {
                    # Clear the user's profile picture
                    Clear-UserPhoto -Identity $userEmail -Confirm:$false
                    Write-Host "Reverted profile picture for $userEmail"
                }
                else {
                    Write-Host "User $userEmail does not have a profile picture. Skipping..."
                }
            }
            catch {
                Write-Host "Error reverting profile picture for $userEmail: $_"
            }
        }
    }
    else {
        # Apply changes for users who opted in and have no existing profile picture
        if ($optIn -eq "Yes") {
            try {
                # Check if the user already has a profile picture
                if ($userEmail -in $existingPhotos) {
                    Write-Host "User $userEmail already has a profile picture. Skipping..."
                }
                else {
                    # Determine the file format based on available extensions (jpg or png)
                    $jpegPath = Join-Path -Path $photoPath -ChildPath "$($userEmail.Split('@')[0]).jpg"
                    $pngPath = Join-Path -Path $photoPath -ChildPath "$($userEmail.Split('@')[0]).png"

                    if (Test-Path $jpegPath) {
                        $fileData = [System.IO.File]::ReadAllBytes($jpegPath)
                    }
                    elseif (Test-Path $pngPath) {
                        $fileData = [System.IO.File]::ReadAllBytes($pngPath)
                    }
                    else {
                        Write-Host "No photo found for $userEmail"
                        continue  # Skip to the next user if no photo is found
                    }

                    # Set the user's profile picture
                    Import-RecipientDataProperty -Identity $userEmail -Picture -FileData $fileData
                    Write-Host "Updated profile picture for $userEmail"
                }
            }
            catch {
                Write-Host "Error updating profile picture for $userEmail: $_"
            }
        }
    }
}

# Disconnect from Exchange Online
Disconnect-ExchangeOnline -Confirm:$false

```

##### Version 2.0 

```
param (
    [switch]$Revert
)

# Import the required module
Install-Module -Name ExchangeOnlineManagement -Force -AllowClobber

# Connect to Exchange Online using your admin credentials
$adminCredential = Get-Credential -Credential 'seanwilson@test.com'
Connect-ExchangeOnline -UserPrincipalName 'seanwilson@test.com' -DelegatedOrganization tenant.onmicrosoft.com -Credential $adminCredential

# Load the CSV file
$csvFile = Import-Csv -Path 'C:\path\to\csv\file.csv'

# Network drive path for photos
$photoPath = "\\192.17.02.01\data\newstarters\photo"

function Get-PhotoFilePath($email) {
    # Determine the file format based on available extensions (jpg or png)
    $jpegPath = Join-Path -Path $photoPath -ChildPath "$($email.Split('@')[0]).jpg"
    $pngPath = Join-Path -Path $photoPath -ChildPath "$($email.Split('@')[0]).png"

    if (Test-Path $jpegPath) {
        return $jpegPath
    }
    elseif (Test-Path $pngPath) {
        return $pngPath
    }
    else {
        Write-Host "No photo found for $email"
        return $null
    }
}

function Get-ExistingPhotos() {
    # Pre-load user profile picture availability
    Get-UserPhoto -ResultSize Unlimited | ForEach-Object { $_.Identity.Id }
}

# Pre-load user profile picture availability
$existingPhotos = Get-ExistingPhotos

# Loop through each row in the CSV file
foreach ($row in $csvFile) {
    $userEmail = $row.Email
    $optIn = $row.OptIn

    if ($optIn -eq "Yes") {
        try {
            # Check if the user already has a profile picture
            switch ($Revert) {
                {$_} {
                    if ($existingPhotos -contains $userEmail) {
                        # Clear the user's profile picture
                        Clear-UserPhoto -Identity $userEmail -Confirm:$false
                        Write-Host "Reverted profile picture for $userEmail"
                    } else {
                        Write-Host "User $userEmail does not have a profile picture. Skipping..."
                    }
                }
                default {
                    if ($existingPhotos -contains $userEmail) {
                        Write-Host "User $userEmail already has a profile picture. Skipping..."
                    } else {
                        # Get photo file path
                        $filePath = Get-PhotoFilePath($userEmail)
                        if ($null -ne $filePath) {
                            # Set the user's profile picture
                            Import-RecipientDataProperty -Identity $userEmail -Picture -FileData ([System.IO.File]::ReadAllBytes($filePath))
                            Write-Host "Updated profile picture for $userEmail"
                        }
                    }
                }
            }
        }
        catch {
            Write-Host "Error processing profile picture for $userEmail: $_"
        }
    }
}

# Disconnect from Exchange Online
Disconnect-ExchangeOnline -Confirm:$false


```